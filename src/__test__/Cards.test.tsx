import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, describe, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "@/components/ui/provider";

import { Cards } from "../components/pages/Cards";
import { Home } from "../components/pages/Home";
import { mockUser, mockSkill } from "./mocks";

vi.mock("../hooks/useUser");
vi.mock("../hooks/useSkill");

import { useUser } from "../hooks/useUser";
import { useSkill } from "../hooks/useSkill";

describe("Cards コンポーネント", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("ユーザー情報が正しく表示される", () => {
    vi.mocked(useUser).mockReturnValue(mockUser());
    vi.mocked(useSkill).mockReturnValue(mockSkill());

    render(
      <Provider>
        <MemoryRouter initialEntries={["/cards/test-id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Cards />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("テストユーザー")).toBeInTheDocument();
    expect(screen.getByText("テスト説明")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  test("GitHubアイコンのリンクが正しく表示される", () => {
    vi.mocked(useUser).mockReturnValue(mockUser());
    vi.mocked(useSkill).mockReturnValue(mockSkill());

    render(
      <Provider>
        <MemoryRouter initialEntries={["/cards/test-id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Cards />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const links = screen.getAllByRole("link");
    const githubLink = links.find((link) =>
      link.getAttribute("href")?.includes("github.com")
    );
    expect(githubLink).toBeDefined();
    expect(githubLink).toHaveAttribute("href", "https://github.com/testgithub");
  });

  test("Qiitaアイコンのリンクが正しく表示される", () => {
    vi.mocked(useUser).mockReturnValue(mockUser());
    vi.mocked(useSkill).mockReturnValue(mockSkill());

    render(
      <Provider>
        <MemoryRouter initialEntries={["/cards/test-id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Cards />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const links = screen.getAllByRole("link");
    const qiitaLink = links.find((link) =>
      link.getAttribute("href")?.includes("qiita.com")
    );
    expect(qiitaLink).toBeDefined();
    expect(qiitaLink).toHaveAttribute("href", "https://qiita.com/testqiita");
  });

  test("Xアイコンのリンクが正しく表示される", () => {
    vi.mocked(useUser).mockReturnValue(mockUser());
    vi.mocked(useSkill).mockReturnValue(mockSkill());

    render(
      <Provider>
        <MemoryRouter initialEntries={["/cards/test-id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Cards />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const links = screen.getAllByRole("link");
    const xLink = links.find((link) =>
      link.getAttribute("href")?.includes("twitter.com")
    );
    expect(xLink).toBeDefined();
    expect(xLink).toHaveAttribute("href", "https://twitter.com/testx");
  });

  test("ローディング中は Loading... が表示される", () => {
    vi.mocked(useUser).mockReturnValue(
      mockUser({ loading: true, userData: null })
    );
    vi.mocked(useSkill).mockReturnValue(
      mockSkill({ loading: true, skill: null })
    );

    render(
      <Provider>
        <MemoryRouter initialEntries={["/cards/test-id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Cards />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("エラー時はエラーメッセージが表示される", () => {
    vi.mocked(useUser).mockReturnValue(
      mockUser({ error: "User not found", userData: null })
    );
    vi.mocked(useSkill).mockReturnValue(mockSkill());

    render(
      <Provider>
        <MemoryRouter initialEntries={["/cards/test-id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Cards />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("ユーザーが見つかりません")).toBeInTheDocument();
  });

  test("戻りボタンをクリックするとホームに遷移する", async () => {
    vi.mocked(useUser).mockReturnValue(mockUser());
    vi.mocked(useSkill).mockReturnValue(mockSkill());

    render(
      <Provider>
        <MemoryRouter initialEntries={["/cards/test-id"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cards/:id" element={<Cards />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const backButton = screen.getByRole("button", { name: "戻る" });
    fireEvent.click(backButton);

    expect(screen.getByText("デジタル名刺アプリ")).toBeInTheDocument();
  });
});

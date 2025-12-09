import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, describe, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom";
import { Provider } from "@/components/ui/provider";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { Register } from "../components/pages/Register";
import { Home } from "../components/pages/Home";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn((table: string) => {
      console.log("Mock called for table:", table);
      if (table === "skills") {
        return {
          select: vi.fn().mockResolvedValue({
            data: [
              { id: 1, name: "React" },
              { id: 2, name: "Vue" },
              { id: 3, name: "TypeScript" },
            ],
            error: null,
          }),
        };
      }
      if (table === "users" || table === "user_skill") {
        return {
          insert: vi.fn().mockResolvedValue({
            data: null,
            error: null,
          }),
        };
      }
      return {};
    }),
  },
}));

describe("Register コンポーネント", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("タイトルが正しく表示される", async () => {
    render(
      <Provider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(
      () => {
        expect(screen.getByText("新規名刺登録")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test("全項目入力して登録ボタンを押すとホームに遷移する", async () => {
    render(
      <Provider>
        <MemoryRouter initialEntries={["/register"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(
      () => {
        expect(screen.getByLabelText(/好きな英単語/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const userIdInput = screen.getByLabelText(/好きな英単語/i);
    const nameInput = screen.getByLabelText(/名前/i);
    const descriptionInput = screen.getByLabelText(/自己紹介/i);
    const githubInput = screen.getByLabelText(/GitHub ID/i);
    const qiitaInput = screen.getByLabelText(/Qiita ID/i);
    const xInput = screen.getByLabelText(/X ID/i);

    fireEvent.change(userIdInput, { target: { value: "testuser" } });
    fireEvent.change(nameInput, { target: { value: "テストユーザー" } });
    fireEvent.change(descriptionInput, { target: { value: "テスト説明" } });

    const skillSelect = screen.getByRole("combobox", { name: /好きな技術/i });
    fireEvent.click(skillSelect);

    const reactOption = await screen.findByRole("option", { name: "React" });
    fireEvent.click(reactOption);

    fireEvent.change(githubInput, { target: { value: "testgithub" } });
    fireEvent.change(qiitaInput, { target: { value: "testqiita" } });
    fireEvent.change(xInput, { target: { value: "testx" } });

    const submitButton = screen.getByRole("button", { name: /登録/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("デジタル名刺アプリ")).toBeInTheDocument();
    });
  });
});

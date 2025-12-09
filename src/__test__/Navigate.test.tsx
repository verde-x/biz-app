import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, describe, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "@/components/ui/provider";

import { Cards } from "../components/pages/Cards";
import { mockUser, mockSkill } from "./mocks";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "test-id" }),
  };
});

vi.mock("../hooks/useUser");
vi.mock("../hooks/useSkill");

import { useUser } from "../hooks/useUser";
import { useSkill } from "../hooks/useSkill";

describe("Cards コンポーネント - ナビゲーションのテスト", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("戻るボタンをクリックするとnavigate('/')が呼ばれる", () => {
    vi.mocked(useUser).mockReturnValue(mockUser());
    vi.mocked(useSkill).mockReturnValue(mockSkill());

    render(
      <Provider>
        <MemoryRouter>
          <Cards />
        </MemoryRouter>
      </Provider>
    );

    const backButton = screen.getByRole("button", { name: "戻る" });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});

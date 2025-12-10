import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test, describe, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { CardList } from "../../components/cards/CardList";
import { useCard } from "../../hooks/useCard";
import { mockUseAuth, mockUseCard, mockCard } from "../mocks";

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock("../../hooks/useCard", () => ({
  useCard: vi.fn(),
}));

vi.mock("../../components/cards/AddCardDialog", () => ({
  AddCardDialog: () => <div data-testid="add-card-dialog">Add Card Dialog</div>,
}));

vi.mock("../../components/cards/EditCardDialog", () => ({
  EditCardDialog: () => <div data-testid="edit-card-dialog">Edit</div>,
}));

vi.mock("../../components/cards/DeleteCardDialog", () => ({
  DeleteCardDialog: () => <div data-testid="delete-card-dialog">Delete</div>,
}));

describe("CardList コンポーネント", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("ローディング中の表示", () => {
    vi.mocked(useCard).mockReturnValue(
      mockUseCard({
        loading: true,
      })
    );

    render(<CardList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("エラー時の表示", () => {
    vi.mocked(useCard).mockReturnValue(
      mockUseCard({
        error: { message: "Failed to fetch" } as Error,
      })
    );

    render(<CardList />);
    expect(screen.getByText(/Error: Failed to fetch/)).toBeInTheDocument();
  });

  test("カードが0件の場合の表示", () => {
    vi.mocked(useCard).mockReturnValue(mockUseCard());

    render(<CardList />);
    expect(screen.getByText("Business Cards")).toBeInTheDocument();
    expect(screen.getByText("0 cards registered")).toBeInTheDocument();
  });

  test("カードが1件の場合の表示", () => {
    const card = mockCard();

    vi.mocked(useCard).mockReturnValue(
      mockUseCard({
        cards: [card],
      })
    );

    render(<CardList />);
    expect(screen.getByText("Business Cards")).toBeInTheDocument();
    expect(screen.getByText("1 card registered")).toBeInTheDocument();
    expect(screen.getByText("山田 太郎")).toBeInTheDocument();
    expect(screen.getByText("株式会社テスト")).toBeInTheDocument();
    expect(screen.getByText("開発部")).toBeInTheDocument();
    expect(screen.getByText("taro@test.com")).toBeInTheDocument();
  });

  test("カードが複数件の場合の表示", () => {
    const cards = [
      mockCard(),
      mockCard({
        id: "2",
        first_name: "花子",
        last_name: "佐藤",
        company: "株式会社サンプル",
        department: "営業部",
        email: "hanako@sample.com",
      }),
    ];

    vi.mocked(useCard).mockReturnValue(
      mockUseCard({
        cards: cards,
      })
    );

    render(<CardList />);
    expect(screen.getByText("2 cards registered")).toBeInTheDocument();
    expect(screen.getByText("山田 太郎")).toBeInTheDocument();
    expect(screen.getByText("佐藤 花子")).toBeInTheDocument();
  });

  test("テーブルヘッダーが正しく表示される", () => {
    vi.mocked(useCard).mockReturnValue(mockUseCard());

    render(<CardList />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Department")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
});

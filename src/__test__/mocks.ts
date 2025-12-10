import { vi } from "vitest";
import type { Card } from "../types/card";

export const mockUseAuth = (overrides = {}) => ({
  user: { id: "test-user-id" },
  session: null,
  loading: false,
  ...overrides,
});

export const mockUseCard = (overrides = {}) => ({
  cards: [],
  loading: false,
  error: null,
  refetch: vi.fn(),
  addCard: vi.fn(),
  updateCard: vi.fn(),
  deleteCard: vi.fn(),
  ...overrides,
});

export const defaultCardData: Card = {
  id: "1",
  user_id: "test-user-id",
  first_name: "太郎",
  last_name: "山田",
  company: "株式会社テスト",
  department: "開発部",
  role: "エンジニア",
  phone1: "03-1234-5678",
  phone2: "090-1234-5678",
  email: "taro@test.com",
  url: "https://example.com",
  zip: "100-0001",
  address1: "東京都千代田区",
  address2: "丸の内1-1-1",
  note: "備考",
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
};

export const mockCard = (overrides: Partial<Card> = {}): Card => ({
  ...defaultCardData,
  ...overrides,
});

import { render } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import React from "react";

import App from "../App";

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    session: null,
    loading: false,
  }),
}));

describe("App コンポーネント", () => {
  test("AppRouter が正常にレンダリングされる", () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});

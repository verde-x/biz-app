import { render } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import App from "../App";
import * as useAuthModule from "@/hooks/useAuth";

vi.mock("@/hooks/useAuth");

describe("App コンポーネント", () => {
  test("AppRouter が正常にレンダリングされる", () => {
    render(
      <Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe("App コンポーネント", () => {
  test("AppRouter が正常にレンダリングされる", () => {
    const { container } = render(
      <Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  test("ルーターコンポーネントが含まれている", () => {
    const { container } = render(
      <Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(container.querySelector("div")).toBeInTheDocument();
  });
});

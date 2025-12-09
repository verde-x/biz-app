import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

/**
 * Vitestの expect に、Testing Libraryの追加マッチャーを追加
 *
 * 具体的な機能:
 *  - expect(element).toBeInTheDocument() - 要素がDOMに存在するか
 *  - expect(element).toBeVisible() - 要素が表示されているか
 *  - expect(element).toHaveTextContent("text") - テキストを含むか
 *  - expect(element).toBeDisabled() - 無効化されているか
 */

expect.extend(matchers);

/**
 * 各テストケースの実行後、DOMから全てのレンダリング要素を削除
 */
afterEach(() => {
  cleanup();
});

/**
 * window.matchMedia モック実装
 * Chakra UI + next-themes + react-router という複雑な構成
 * これらがブラウザAPIに依存している
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
});

/**
 * ResizeObserver モック実装
 * Chakra UIのSelectコンポーネント(@floating-ui/dom)が使用
 */
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

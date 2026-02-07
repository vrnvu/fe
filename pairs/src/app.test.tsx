import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./app";

describe("App", () => {
  it("renders the page", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("shows the heading", () => {
    const { getByRole } = render(<App />);
    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      "Hello, Pairs!",
    );
  });
});

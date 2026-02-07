import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./app";

describe("App", () => {
  it("renders the page", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("shows the valentine question", () => {
    const { getByRole } = render(<App />);
    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      "¿Quieres ser mi San Valentín?",
    );
  });

  it("renders Yes and No buttons", () => {
    const { getByRole } = render(<App />);
    expect(getByRole("button", { name: "Sí" })).toBeInTheDocument();
    expect(getByRole("button", { name: "No" })).toBeInTheDocument();
  });
});

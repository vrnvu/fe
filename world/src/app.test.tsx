import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./app";

describe("App", () => {
  it("matches snapshot", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renders the heading", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /nuestro mundo/i }),
    ).toBeInTheDocument();
  });

  it("shows destination count", () => {
    render(<App />);
    expect(screen.getByText(/6 destinos/)).toBeInTheDocument();
  });
});

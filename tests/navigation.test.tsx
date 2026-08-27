import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home", () => {
  it("keeps the official tagline wording intact", () => {
    render(<Home />);

    expect(
      screen.getByText(/Abound with creative idea\./i),
    ).toBeInTheDocument();
  });
});

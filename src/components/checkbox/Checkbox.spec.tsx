import { render, screen } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("should render", () => {
    render(<Checkbox />);
    expect(screen.getByTestId("Checkbox")).toBeInTheDocument();
  });

  it("should render checked", () => {
    render(<Checkbox checked />);
    expect(screen.getByTestId("Checkbox")).toHaveClass("checked");
  });
});

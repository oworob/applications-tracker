import { render, screen } from "@testing-library/react";
import LoadingIcon from "./LoadingIcon";

describe("LoadingIcon", () => {
  it("should render", () => {
    render(<LoadingIcon />);
    expect(screen.getByTestId("LoadingIcon")).toBeInTheDocument();
  });
});

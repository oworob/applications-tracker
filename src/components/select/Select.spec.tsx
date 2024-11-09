import { render, screen, fireEvent, within } from "@testing-library/react";
import Select from "./Select";

describe("Select", () => {
  const options = ["one", "two", "three"];
  const DisplayFun = (option: string) => option;
  let SelectedOption = options[0];
  const SetSelectedOption = jest.fn((option: string) => (SelectedOption = option));

  beforeEach(() => {
    SelectedOption = options[0];
    render(<Select options={options} DisplayFun={DisplayFun} SelectedOption={SelectedOption} SetSelectedOption={SetSelectedOption} />);
  });

  it("should render", () => {
    expect(screen.getByTestId("Select")).toBeInTheDocument();
  });

  it("should open and close the dropdown", () => {
    const select_header = screen.getByTestId("select-header");
    fireEvent.click(select_header);
    expect(screen.getByTestId("select-options")).not.toHaveAttribute("hidden");
    fireEvent.click(select_header);
    expect(screen.getByTestId("select-options")).toHaveAttribute("hidden");
  });

  it("should hide the dropdown when mouse leaves", () => {
    const select_wrapper = screen.getByTestId("select-wrapper");
    fireEvent.mouseLeave(select_wrapper);
    expect(screen.getByTestId("select-options")).toHaveAttribute("hidden");
  });

  it("should select an option", () => {
    const option = within(screen.getByTestId("select-options")).getByText(options[1]);
    fireEvent.click(option);
    expect(SetSelectedOption).toHaveBeenCalled();
  });

  it("should not select the same option", () => {
    const option = within(screen.getByTestId("select-options")).getByText(options[0]);
    fireEvent.click(option);
    expect(SetSelectedOption).not.toHaveBeenCalled();
  });
});

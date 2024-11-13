import { render, screen, fireEvent, within } from "@testing-library/react";
import Select from "./Select";
import { vi } from "vitest";

describe("Select", () => {
  const options = ["one", "two", "three"];
  const DisplayFun = (option: string) => option;
  const SelectedOption = options[0];
  const SetSelectedOption = vi.fn();

  beforeEach(() => {});

  it("should render", () => {
    render(<Select options={options} DisplayFun={DisplayFun} SelectedOption={SelectedOption} SetSelectedOption={SetSelectedOption} />);
    expect(screen.getByTestId("Select")).toBeInTheDocument();
  });

  it("should open and close the dropdown", () => {
    render(<Select options={options} DisplayFun={DisplayFun} SelectedOption={SelectedOption} SetSelectedOption={SetSelectedOption} />);
    const select_header = screen.getByTestId("select-header");
    fireEvent.click(select_header);
    expect(screen.getByTestId("select-options")).not.toHaveAttribute("hidden");
    fireEvent.click(select_header);
    expect(screen.getByTestId("select-options")).toHaveAttribute("hidden");
  });

  it("should hide the dropdown when mouse leaves", () => {
    render(<Select options={options} DisplayFun={DisplayFun} SelectedOption={SelectedOption} SetSelectedOption={SetSelectedOption} />);
    const select_wrapper = screen.getByTestId("select-wrapper");
    fireEvent.mouseLeave(select_wrapper);
    expect(screen.getByTestId("select-options")).toHaveAttribute("hidden");
  });

  it("should select an option", () => {
    render(<Select options={options} DisplayFun={DisplayFun} SelectedOption={SelectedOption} SetSelectedOption={SetSelectedOption} />);
    const option = within(screen.getByTestId("select-options")).getByText(options[1]);
    fireEvent.click(option);
    expect(SetSelectedOption).toHaveBeenCalled();
  });

  it.skip("should not select the same option", () => {
    render(<Select options={options} DisplayFun={DisplayFun} SelectedOption={SelectedOption} SetSelectedOption={SetSelectedOption} />);
    const option = within(screen.getByTestId("select-options")).getByText(options[0]);
    fireEvent.click(option);
    expect(SetSelectedOption).not.toHaveBeenCalled();
  });
});

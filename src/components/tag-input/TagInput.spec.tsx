import { render, fireEvent, screen } from "@testing-library/react";
import TagInput from "./TagInput";
import { vi } from "vitest";

describe("TagInput", () => {
  let TagsMock: string[];
  let SetTagsMock = vi.fn();

  beforeEach(() => {
    TagsMock = [];
    SetTagsMock = vi.fn((new_tags: string[]) => {
      TagsMock = new_tags;
    });
  });

  it("should render", () => {
    render(<TagInput Tags={TagsMock} SetTags={SetTagsMock} />);
    expect(screen.getByTestId("TagInput")).toBeInTheDocument();
  });

  it("should add a tag when entered", () => {
    render(<TagInput Tags={TagsMock} SetTags={SetTagsMock} />);
    const input = screen.getByTestId("tag-input");

    fireEvent.change(input, { target: { value: "test_tag" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(TagsMock).toEqual(["test_tag"]);
  });

  it("should not allow duplicate tags", () => {
    render(<TagInput Tags={TagsMock} SetTags={SetTagsMock} />);
    const input = screen.getByTestId("tag-input");

    fireEvent.change(input, { target: { value: "test_tag" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    fireEvent.change(input, { target: { value: "test_tag" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(TagsMock).toEqual(["test_tag"]);
  });

  it("should remove tag when clicked", () => {
    TagsMock = ["test_tag"];
    render(<TagInput Tags={TagsMock} SetTags={SetTagsMock} />);
    expect(screen.getByText("test_tag")).toBeInTheDocument();

    fireEvent.click(screen.getByText("test_tag"));
    expect(TagsMock).toEqual([]);
  });

  it("should remove last tag when backspace is pressed", () => {
    TagsMock = ["test_tag"];
    render(<TagInput Tags={TagsMock} SetTags={SetTagsMock} />);
    const input = screen.getByTestId("tag-input");
    fireEvent.keyDown(input, { key: "Backspace" });

    expect(TagsMock).toEqual([]);
  });
});

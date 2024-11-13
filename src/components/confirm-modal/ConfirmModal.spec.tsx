import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmModal from "./ConfirmModal";
import { vi } from "vitest";

describe("ConfirmModal", () => {
  const title = "test_title";
  const message = "test-message";
  const onConfirm = vi.fn();
  const onCancel = vi.fn();

  it("should render the modal with title and message", () => {
    render(<ConfirmModal title={title} message={message} onConfirm={onConfirm} onCancel={onCancel} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should block scrolling when the modal is open", () => {
    render(<ConfirmModal title={title} message={message} onConfirm={onConfirm} onCancel={onCancel} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should call onConfirm when confirm button is clicked", () => {
    render(<ConfirmModal title={title} message={message} onConfirm={onConfirm} onCancel={onCancel} />);
    fireEvent.click(screen.getByText("Confirm"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(<ConfirmModal title={title} message={message} onConfirm={onConfirm} onCancel={onCancel} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });
});

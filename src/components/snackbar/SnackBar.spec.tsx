import { act, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import SnackBar from "./SnackBar";
import store from "stores/Store";
import { vi } from "vitest";

describe("SnackBar", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  it("should render", () => {
    render(
      <Provider store={store}>
        <SnackBar />
      </Provider>
    );
    expect(screen.getByTestId("SnackBar")).toBeInTheDocument();
  });

  it("should render a message", () => {
    render(
      <Provider store={store}>
        <SnackBar />
      </Provider>
    );
    act(() => {
      store.dispatch({ type: "notification/ShowNotification", payload: { message: "test_message", notification_type: "success" } });
    });
    expect(screen.getByText("test_message")).toBeInTheDocument();

    act(() => {
      store.dispatch({ type: "notification/ShowNotification", payload: { message: "test_error_message", notification_type: "error" } });
    });
    expect(screen.getByText("test_error_message")).toBeInTheDocument();
  });

  it("should hide after a few seconds", async () => {
    render(
      <Provider store={store}>
        <SnackBar />
      </Provider>
    );
    act(() => {
      store.dispatch({ type: "notification/ShowNotification", payload: { message: "test_message", notification_type: "success" } });
    });
    await waitFor(() => expect(screen.getByTestId("SnackBar").className).toBe("show"));
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    await waitFor(() => expect(screen.getByTestId("SnackBar").className).toBe("hide"));
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });
});

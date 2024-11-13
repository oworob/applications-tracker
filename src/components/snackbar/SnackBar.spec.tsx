import { act, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import SnackBar from "./SnackBar";
import store from "stores/Store";
import { vi } from "vitest";

describe("SnackBar", () => {
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
  });

  it.skip("should hide after a few seconds", async () => {
    render(
      <Provider store={store}>
        <SnackBar />
      </Provider>
    );
    act(() => {
      store.dispatch({ type: "notification/ShowNotification", payload: { message: "test_message", notification_type: "success" } });
    });
    await waitFor(() => expect(screen.getByTestId("SnackBar").className).toBe("show"));
    await waitFor(() => expect(screen.getByTestId("SnackBar").className).toBe("hide"));
  });

  it("should use the correct icon", async () => {
    render(
      <Provider store={store}>
        <SnackBar />
      </Provider>
    );
    act(() => {
      store.dispatch({ type: "notification/ShowNotification", payload: { message: "test_error_message", notification_type: "error" } });
    });
    await waitFor(() => expect(screen.getByTestId("error-icon")).toBeInTheDocument());
  });

  afterEach(() => {
    vi.clearAllTimers();
  });
});

import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./Nav";
import routes from "assets/routes";

describe("Nav", () => {
  it("should render with links", () => {
    render(
      <Router>
        <Nav />
      </Router>
    );
    expect(screen.getByText(routes[0].name)).toBeInTheDocument();
  });
});

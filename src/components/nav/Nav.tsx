import "./Nav.scss";
import { NavLink } from "react-router-dom";
import routes from "assets/routes";
import { Icon } from "@iconify/react";

export default function Nav() {
  return (
    <nav id="Nav">
      {routes
        .filter((route) => route.icon)
        .map((route) => (
          <NavLink to={route.path} key={route.path} className={`route`}>
            <Icon icon={route.icon || ""} id="icon" />
            {route.name}
          </NavLink>
        ))}
    </nav>
  );
}

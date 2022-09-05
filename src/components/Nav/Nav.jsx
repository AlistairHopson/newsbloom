import "./Nav.css";

import { useContext } from "react";
import { AccountContext } from "../AccountContext";

import { NavLink } from "react-router-dom";

export default function Nav() {
  const { username } = useContext(AccountContext);

  return (
    <nav>
      <div className="container">
        <header>
          <NavLink to="/articles">
            <h1 className="homeHeader">Newsbloom</h1>
          </NavLink>
        </header>
        <NavLink
          to="/profile"
          className={
            username[0].username === "guest"
              ? "nav-account guest"
              : "nav-account"
          }
        >
          <span className="material-icons md-48">account_circle</span>
          <p className="nav-username">{username[0].username}</p>
        </NavLink>
      </div>
    </nav>
  );
}

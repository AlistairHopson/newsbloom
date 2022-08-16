import "./Nav.css";

import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <div className="container">
        <header>
          <NavLink to="/articles">
            <h1 className="homeHeader">Newsbloom</h1>
          </NavLink>
        </header>
        <NavLink to="/profile">
          <span className="material-icons md-48">account_circle</span>
        </NavLink>
      </div>
    </nav>
  );
}

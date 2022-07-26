import "./Nav.css";

import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <header>
        <Link to="/articles">
          <h1>Newsbloom</h1>
        </Link>
      </header>
      <Link to="/profile">
        <h2>Profile</h2>
      </Link>
    </nav>
  );
}

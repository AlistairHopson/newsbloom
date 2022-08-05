import "./GeneralErrorPath.css";

import { Link, useLocation } from "react-router-dom";

export default function GeneralErrorPath() {
  const location = useLocation();

  return (
    <div>
      <h2>Sorry, {location.pathname} isn't a valid path!</h2>
      <Link to={"/articles"} className="go-home">
        <h3>Go home</h3>
        <span className="material-icons md-48">u_turn_left</span>{" "}
      </Link>
    </div>
  );
}

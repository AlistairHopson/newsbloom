import "./Profile.css";

import { useContext } from "react";
import { AccountContext } from "../AccountContext";
import { Link } from "react-router-dom";

export default function () {
  const { username } = useContext(AccountContext);
  const [account, setAccount] = username;

  console.log(account, "<account");

  if (account.username === "guest") {
    return (
      <div className="accounts">
        <h2 className="account-header">Log In:</h2>
        <Link
          to="/profile"
          onClick={() =>
            setAccount({
              username: "cooljmessy",
              name: "Peter Messy",
              avatar_url:
                "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?",
            })
          }
        >
          <div className="account-details desaturated">
            <img
              className="styled-profile"
              src="https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?"
            />
            <h3>Peter Messy</h3>
          </div>
        </Link>
        <br />
      </div>
    );
  }

  return (
    <div className="account-box">
      <h2 className="account-header">Account:</h2>
      <div className="account-details">
        <img className="styled-profile" src={account.avatar_url} />
        <h3>logged in as {account.username}</h3>
      </div>
      <button
        className="log-out"
        onClick={() =>
          setAccount({
            username: "guest",
            name: "guest",
            avatar_url:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          })
        }
      >
        log out
      </button>
    </div>
  );
}

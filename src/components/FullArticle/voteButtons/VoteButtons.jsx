import "./VoteButtons.css";
import voteOnArticle from "../../api-interactions/voteOnArticle";

import { useEffect, useState } from "react";

export default function VoteButtons({ article }) {
  const { article_id, votes } = article;

  const [additionalClickedVotes, setAdditionalClickedVotes] = useState(0);

  const [enabledButtons, setEnabledButtons] = useState(true);
  const [error, setError] = useState(null);

  function handleButtonClick(voteAdjustment) {
    setEnabledButtons(false);
    setAdditionalClickedVotes(voteAdjustment);
    voteOnArticle(article_id, voteAdjustment).catch((err) => {
      setError(err.message);
      return err;
    });
  }

  return (
    <div className="votes">
      <button
        className="downvote"
        onClick={() => {
          if (enabledButtons) handleButtonClick(-1);
        }}
      >
        downvote
      </button>
      <p>{error ? error : `${votes + additionalClickedVotes} votes`} </p>
      <button
        className="upvote"
        onClick={() => {
          if (enabledButtons) handleButtonClick(1);
        }}
      >
        upvote
      </button>
      <br />
    </div>
  );
}

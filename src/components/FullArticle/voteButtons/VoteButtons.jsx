import "./VoteButtons.css";
import voteOnArticle from "../../api-interactions/voteOnArticle";

import { useEffect, useState } from "react";

export default function VoteButtons({ article }) {
  const { article_id, votes } = article;

  const [additionalClickedVotes, setAdditionalClickedVotes] = useState(0);

  const [downvoted, setDownvoted] = useState();
  const [upvoted, setUpvoted] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (downvoted) {
      setAdditionalClickedVotes(-1);
      voteOnArticle(article_id, -1).catch((err) => {
        setError(err.message);
        return err;
      });
    }
    if (downvoted === false) {
      setAdditionalClickedVotes(0);
      voteOnArticle(article_id, 1).catch((err) => {
        setError(err.message);
        return err;
      });
    }
    if (upvoted) {
      setAdditionalClickedVotes(1);

      voteOnArticle(article_id, 1).catch((err) => {
        setError(err.message);
        return err;
      });
    }
    if (upvoted === false) {
      setAdditionalClickedVotes(0);
      voteOnArticle(article_id, -1).catch((err) => {
        setError(err.message);
        return err;
      });
    }
  }, [upvoted, downvoted, article_id]);

  function handleDownvote() {
    downvoted ? setDownvoted(false) : setDownvoted(true);
    setUpvoted(null);
  }

  function handleUpvote() {
    upvoted ? setUpvoted(false) : setUpvoted(true);
    setDownvoted(null);
  }

  return (
    <div className="votes-field">
      <button
        onClick={() => {
          if (upvoted) {
            setUpvoted(false);
            setDownvoted(null);
          } else {
            handleDownvote();
          }
        }}
        className={downvoted ? "downvote-selected" : "downvote"}
      >
        <span className="material-icons md-24">thumb_down_alt</span>
      </button>
      <p className="vote-count-and-errors">
        {error ? error : `${votes + additionalClickedVotes} votes`}{" "}
      </p>
      <button
        onClick={() => {
          if (downvoted) {
            setDownvoted(false);
            setUpvoted(null);
          } else {
            handleUpvote();
          }
        }}
        className={upvoted ? "upvote-selected" : "upvote"}
      >
        <span className="material-icons md-24">thumb_up_alt</span>
      </button>
      <br />
    </div>
  );
}

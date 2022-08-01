import "./PostCommentForm.css";

import { useContext } from "react";
import { AccountContext } from "../../AccountContext";
import { Link } from "react-router-dom";

import CommentCard from "../VoteButtons/ArticleComments/CommentCard/CommentCard";
import { useState } from "react";
import postComment from "../../api-interactions/postComment";

export default function PostCommentForm({ article }) {
  const [height, setHeight] = useState(34);

  const { article_id } = article;
  const { username } = useContext(AccountContext);
  const [comment, setComment] = useState(null);
  const [error, setError] = useState(null);
  const [postSuccessful, setPostSuccessful] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment === null || comment.length === 0) {
      setComment("Cannot post empty comment");
    } else {
      postComment(article_id, username[0].username, comment)
        .then((res) => {
          if (res) setPostSuccessful(true);
        })
        .catch((err) => {
          setError(err.message);
          return err;
        });
    }
  };
  if (postSuccessful) {
    return (
      <CommentCard
        id="temporary-comment"
        key={postSuccessful ? comment : null}
        author={username[0].username}
        body={comment}
        created_at="just now"
        votes={0}
      />
    );
  }

  return (
    <>
      <div className="post-comment-box">
        <form onSubmit={handleSubmit}>
          <label className="post-comment-label">Comment:</label>
          <textarea
            readOnly={
              postSuccessful || username[0].username === "guest" ? true : false
            }
            className="comment-input-box"
            name="comment-to-post"
            style={{ height }}
            onClick={() => {
              if (username[0].username === "guest") {
                setComment("Guests are unable to post");
              }
              <Link to="/profile">
                <p>link</p>
              </Link>;
            }}
            onChange={(e) => {
              if (height + 17 < e.target.scrollHeight) {
                setHeight(height + 17);
              }
              setComment(e.target.value);
            }}
          />
          <button className="submit-comment-button">Post</button>
        </form>
        <br />
      </div>
      <p
        className={
          error ||
          comment === "Cannot post empty comment" ||
          comment === "Guests are unable to post"
            ? `draft-comment-failed`
            : postSuccessful
            ? `draft-comment-successful`
            : `draft-comment`
        }
      >
        <b>{!postSuccessful ? `(Draft) ` : `Your Comment `}: </b>
        {error
          ? `Comment not posted. Guests are unable to post comments.`
          : comment}
      </p>
      <Link
        className={
          comment === "Guests are unable to post" ? "log-in-link" : null
        }
        to="/profile"
      >
        {comment === "Guests are unable to post"
          ? `Log in via account settings.`
          : null}
      </Link>
    </>
  );
}

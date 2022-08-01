import "./CommentCard.css";
import { useState } from "react";

import deleteComment from "../../../../api-interactions/deleteComment";

export default function CommentCard({
  comment_id,
  author,
  body,
  created_at,
  votes,
  username,
}) {
  const [startDelete, setStartDelete] = useState(false);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [error, setError] = useState(null);

  function handleDelete() {
    deleteComment(comment_id)
      .then((res) => {
        if (res) setCommentDeleted(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  if (startDelete) {
    return (
      <div
        className={
          commentDeleted ? "delete-comment-finished" : "start-deleted-comment"
        }
      >
        <div className="strikethrough">
          <div className="author-and-created-at">
            <p>{author}</p>
            <div className="date-and-time">
              <p>{created_at.match(/^[0-9-]+/)}</p>
              <p className="time">
                {created_at === "just now"
                  ? "just now"
                  : created_at.match(/(?<=T)[0-9:]+/)}
              </p>
            </div>
          </div>
          <p>
            <em>{body}</em>
          </p>
        </div>

        <div className="votes-and-delete">
          <p className="strikethrough">{votes} votes</p>

          {username[0].username === author && !commentDeleted && (
            <button
              className={
                startDelete ? "pressed-delete-button" : "delete-button"
              }
              onClick={() => {
                startDelete ? setStartDelete(false) : setStartDelete(true);
              }}
            >
              <span className="material-icons md-36">delete</span>
            </button>
          )}
        </div>
        <div className="confirm-delete-message">
          <p>
            <strong>
              {commentDeleted
                ? "Comment deleted"
                : `${error ? `${error}. Try again.` : "Delete your comment?"}`}
            </strong>
          </p>
          {!commentDeleted && (
            <button
              className="confirm-delete"
              onClick={() => {
                handleDelete();
              }}
            >
              <p>
                <strong>Yes</strong>
              </p>
            </button>
          )}
          {!commentDeleted && (
            <button
              className="cancel-delete"
              onClick={() => {
                setStartDelete(false);
              }}
            >
              <p>
                <strong>No</strong>
              </p>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="comment">
      <div className="author-and-created-at">
        <p>{author}</p>
        <div className="date-and-time">
          <p>{created_at.match(/^[0-9-]+/)}</p>
          <p className="time">
            {created_at === "just now"
              ? "just now"
              : created_at.match(/(?<=T)[0-9:]+/)}
          </p>
        </div>
      </div>
      <p>
        <em>{body}</em>
      </p>
      <div className="votes-and-delete">
        <p>{votes} votes</p>
        {username[0].username === author && (
          <button
            className={startDelete ? "pressed-delete-button" : "delete-button"}
            onClick={() => {
              startDelete ? setStartDelete(false) : setStartDelete(true);
            }}
          >
            <span className="material-icons">delete</span>
          </button>
        )}
      </div>
    </div>
  );
}
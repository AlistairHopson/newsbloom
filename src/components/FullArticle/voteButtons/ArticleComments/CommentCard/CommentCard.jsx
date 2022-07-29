import "./CommentCard.css";
export default function CommentCard({
  comment_id,
  author,
  body,
  created_at,
  votes,
}) {
  return (
    <div className="comment">
      <p>{comment_id}</p>
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
      <p>{votes} votes</p>
    </div>
  );
}

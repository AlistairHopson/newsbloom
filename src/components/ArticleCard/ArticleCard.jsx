import "./ArticleCard.css";

export default function ArticleCard({
  title,
  topic,
  author,
  created_at,
  votes,
  comment_count,
  body,
}) {
  return (
    <article>
      <div className="topic-and-author">
        <p className="topic">{topic.toUpperCase()}</p>
        <p className="author">posted by {author}</p>
      </div>
      <h3 className="title">{title}</h3>
      <p className="article-body">{body.substring(0, 180)}...</p>
      <div className="votes-and-comments">
        <p>votes: {votes}</p>
        <p>comment_count: {comment_count}</p>
      </div>
      <hr className="break" />
    </article>
  );
}

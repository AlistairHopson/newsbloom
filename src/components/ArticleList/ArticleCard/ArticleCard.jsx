import "./ArticleCard.css";

import { Link } from "react-router-dom";

export default function ArticleCard({
  article_id,
  title,
  topic,
  author,
  votes,
  comment_count,
  body,
  created_at,
}) {
  const t = topic;

  const background = `rgba(1${t.charCodeAt(4)}, 194, 1${
    t.charCodeAt(6) ? t.charCodeAt(6) : t.charCodeAt(0)
  }, 0.533)`;

  return (
    <article>
      <div className="topic-and-author">
        <Link to={`/articles/${topic}`}>
          <p style={{ background }} className="topic">
            {topic}
          </p>
        </Link>
        <p className="author">posted by {author}</p>
      </div>
      <Link to={`/articles/article/${article_id}`} className="article-link">
        <h3 className="title">{title}</h3>
        <p className="article-body">{body}...</p>
      </Link>
      <div className="votes-and-comments">
        <p>votes: {votes}</p>
        <p>comment_count: {comment_count}</p>
      </div>
      <div className="timestamp">
        <p>{created_at.match(/^[0-9-]+/)}</p>
        <p className="time">{created_at.match(/(?<=T)[0-9:]+/)}</p>
      </div>
      <hr className="break" />
    </article>
  );
}

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
      <div className="article-container">
        <div className="topic-and-author">
          <Link to={`/articles/${topic}`}>
            <p style={{ background }} className="topic">
              {topic}
            </p>
          </Link>
          <p className="author">by {author}</p>
        </div>
        <Link to={`/articles/article/${article_id}`} className="article-link">
          <h3 className="title">{title}</h3>
          <p className="article-body">{body}...</p>
        </Link>
        <div className="votes-and-comments narrow">
          <p>votes: {votes}</p>
          <div className="comments">
            <span className="untoggled material-icons">chat</span>
            <p>{comment_count}</p>
          </div>
        </div>
        <div className="timestamp">
          <p className="date">{created_at.match(/^[0-9-]+/)}</p>
          <p className="time">{created_at.match(/[0-9]{2}:[0-9]{2}/)}</p>
        </div>
      </div>
      <hr className="break" />
    </article>
  );
}

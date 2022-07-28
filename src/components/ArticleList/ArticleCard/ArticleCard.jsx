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
}) {
  return (
    <article>
      <div className="topic-and-author">
        <p className="topic">{topic}</p>
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
      <hr className="break" />
    </article>
  );
}

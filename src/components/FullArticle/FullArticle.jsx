import "./FullArticle.css";

import { useParams } from "react-router-dom";

import getArticleById from "../api-interactions/getArticleById";
import VoteButtons from "./voteButtons/VoteButtons";

import { useEffect, useState } from "react";

export default function FullArticle() {
  let { article_id } = useParams();

  const [article, setArticle] = useState([]);

  useEffect(() => {
    getArticleById(article_id).then(({ article }) => {
      setArticle(article);
    });
  }, []);

  return (
    <div className="article">
      <h1 className="article-title">{article.title}</h1>
      <p>by {article.author}</p>
      <p>{article.body}</p>
      <div className="votes-and-comments">
        <VoteButtons article={article} />
        <p>{article.comment_count} comments</p>
      </div>
    </div>
  );
}

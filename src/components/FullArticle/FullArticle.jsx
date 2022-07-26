import "./FullArticle.css";

import { useParams } from "react-router-dom";

import ArticleCard from "../ArticleCard/ArticleCard";
import getArticleById from "../api-interactions/getArticleById";
import { useEffect, useState } from "react";

export default function FullArticle() {
  let { article_id } = useParams();
  const [article, setArticle] = useState([]);

  console.log(article_id, "article_id in FullArticle");

  useEffect(() => {
    getArticleById(article_id).then(({ article }) => {
      setArticle(article);
    });
  }, []);

  console.log(article);

  return (
    <div className="article">
      <h1>{article.title}</h1>
      <p>by {article.author}</p>
      <p>{article.body}</p>
      <p>{article.votes} votes</p>
      <p>{article.comment_count} comments</p>
    </div>
  );
}

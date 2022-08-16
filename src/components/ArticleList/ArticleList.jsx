import "./ArticleList.css";
import "./ArticlesLoader.css";

import { Link, useParams, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import getArticles from "../api-interactions/getArticles";
import ArticleCard from "./ArticleCard/ArticleCard";
import Filters from "../Filters/Filters";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  let { topic } = useParams();
  const [searchParams] = useSearchParams();

  let sort_by =
    searchParams.get("sort_by") === null ? "date" : searchParams.get("sort_by");

  let order =
    searchParams.get("order") === null ? "desc" : searchParams.get("order");

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    getArticles(topic, sort_by, order)
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [topic, sort_by, order]);

  if (isLoading) {
    return (
      <>
        <Filters />
        <div className="loader"></div>
      </>
    );
  }

  if (error) {
    return (
      <div className="no-resource-error">
        <p>{error}</p>
        <p>Sorry, the page you requested does not exist.</p>
        <Link to={"/"} className="go-home">
          <h3>Go home</h3>
          <span className="material-icons md-48">u_turn_left</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="article-list">
      <Filters />
      <section className="articles">
        <div className="container">
          {articles.map(
            ({
              title,
              topic,
              body,
              author,
              votes,
              comment_count,
              article_id,
              date,
              created_at,
            }) => {
              return (
                <ArticleCard
                  key={article_id}
                  article_id={article_id}
                  topic={topic}
                  title={title}
                  body={body.substring(0, 180)}
                  author={author}
                  votes={votes}
                  comment_count={comment_count}
                  date={date}
                  created_at={created_at}
                />
              );
            }
          )}
        </div>
      </section>
    </div>
  );
}

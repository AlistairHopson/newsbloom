import "./ArticleList.css";
import "./ArticlesLoader.css";

import { useParams, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import getArticles from "../api-interactions/getArticles";
import ArticleCard from "./ArticleCard/ArticleCard";
import Filters from "../Filters/Filters";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let { topic } = useParams();
  const [searchParams] = useSearchParams();

  let sort_by =
    searchParams.get("sort_by") === null ? "date" : searchParams.get("sort_by");

  let order =
    searchParams.get("order") === null ? "desc" : searchParams.get("order");

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sort_by, order).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic, sort_by, order]);

  if (isLoading) {
    return (
      <>
        <Filters />
        <h2>Articles:</h2>
        <div className="loader"></div>
      </>
    );
  }

  return (
    <>
      <Filters />
      <h2>Articles:</h2>
      <section className="articles">
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
      </section>
    </>
  );
}

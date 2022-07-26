import "./ArticleList.css";
import "./ArticlesLoader.css";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import getArticles from "../api-interactions/getArticles";
import ArticleCard from "../ArticleCard/ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic]);

  if (isLoading) {
    return (
      <>
        <h2>Articles:</h2>
        <div className="loader"></div>
      </>
    );
  }

  return (
    <>
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
          }) => {
            return (
              <ArticleCard
                key={article_id}
                title={title}
                topic={topic}
                body={body}
                author={author}
                votes={votes}
                comment_count={comment_count}
              />
            );
          }
        )}
      </section>
    </>
  );
}

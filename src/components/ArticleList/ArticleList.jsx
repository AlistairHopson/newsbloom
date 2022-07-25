import "./ArticleList.css";
import { useEffect, useState } from "react";
import getArticles from "../api-interactions/getArticles";
import ArticleCard from "../ArticleCard/ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticles().then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
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

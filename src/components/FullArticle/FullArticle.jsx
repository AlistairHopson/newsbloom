import "./FullArticle.css";

import { useParams } from "react-router-dom";

import getArticleById from "../api-interactions/getArticleById";
import getArticleComments from "../api-interactions/getArticleComments";
import VoteButtons from "./VoteButtons/VoteButtons";
import CommentCard from "./VoteButtons/ArticleComments/CommentCard/CommentCard";
import PostCommentForm from "./PostCommentForm/PostCommentForm";
import { useEffect, useState, Fragment } from "react";
import "./CentralLoader.css";

export default function FullArticle() {
  let { article_id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [toggledComments, setToggledComments] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then(({ article }) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  useEffect(() => {
    getArticleComments(article_id).then(({ comments }) => {
      setComments(comments);
    });
  }, [article_id]);

  if (isLoading) {
    return (
      <>
        <div className="central-loader"></div>
      </>
    );
  }

  return (
    <div className="article">
      <h1 className="article-title">{article.title}</h1>
      <div className="author-and-created-at">
        <p>by {article.author}</p>
        <div className="date-and-time">
          <p>{article.created_at.match(/^[0-9-]+/)}</p>
          <p className="time">{article.created_at.match(/(?<=T)[0-9:]+/)}</p>
        </div>
      </div>
      <p>{article.body}</p>
      <div className="votes-and-comments">
        <VoteButtons article={article} />

        <div className="comments">
          <p className="comment-count">{article.comment_count} </p>
          <button
            className={
              toggledComments ? "toggled-comments" : "untoggled-comments"
            }
            onClick={() => {
              setToggledComments(toggledComments ? false : true);
            }}
          >
            <span className="material-icons">chat</span>
          </button>
        </div>
      </div>
      <hr />
      <PostCommentForm article={article} />

      {comments.map(({ author, body, created_at, votes, comment_id }) => {
        if (toggledComments)
          return (
            <Fragment key={comment_id}>
              <hr />
              <CommentCard
                key={comment_id}
                author={author}
                body={body}
                created_at={created_at}
                votes={votes}
              />
              <hr />
            </Fragment>
          );
      })}
    </div>
  );
}

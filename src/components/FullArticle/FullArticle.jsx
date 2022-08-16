import "./FullArticle.css";

import { Link, useParams } from "react-router-dom";

import { useContext } from "react";
import { AccountContext } from "../AccountContext";

import getArticleById from "../api-interactions/getArticleById";
import getArticleComments from "../api-interactions/getArticleComments";
import VoteButtons from "./VotingButtons/VoteButtons.jsx";
import CommentCard from "./VotingButtons/ArticleComments/CommentCard/CommentCard";
import PostCommentForm from "./PostCommentForm/PostCommentForm";
import { useEffect, useState, Fragment } from "react";
import "./CentralLoader.css";

export default function FullArticle() {
  let { article_id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [toggledComments, setToggledComments] = useState(true);

  const { username } = useContext(AccountContext);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then(({ article }) => {
        setArticle(article);
        if (document.readyState == "complete") {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [article_id]);

  useEffect(() => {
    getArticleComments(article_id).then(({ comments }) => {
      setComments(comments);
    });
  }, [article_id]);

  if (error) {
    return (
      <div className="no-ID-found">
        <p>{error}</p>
        <p>
          Sorry, we can’t find any articles with an ID of
          <em> {article_id}</em>
        </p>
        <Link to={"/articles"} className="go-home">
          <h3>Go home</h3>
          <span className="material-icons md-48">u_turn_left</span>
        </Link>
      </div>
    );
  }

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
                comment_id={comment_id}
                author={author}
                body={body}
                created_at={created_at}
                votes={votes}
                username={username}
              />
              <hr />
            </Fragment>
          );
      })}
    </div>
  );
}

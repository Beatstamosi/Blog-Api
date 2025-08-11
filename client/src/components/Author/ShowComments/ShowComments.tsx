import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Comments } from "../../types/Comments";
import style from "./ShowComments.module.css";

function ShowComments() {
  const { postId } = useParams();
  const [comments, setComments] = useState<Comments[] | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/comment/all-comments/${postId}`
      );

      const data = await res.json();

      if (res.ok) {
        setComments(data.comments);
      } else {
        navigate("/error");
      }
    };

    fetchComments();
  }, [postId, navigate]);

  const deleteComment = async (commentId: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/comment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.ok && comments) {
      const updatedComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updatedComments);
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Comments</h2>
      {comments?.length ? (
        <ul className={style.commentList}>
          {comments.map((comment) => (
            <li key={comment.id} className={style.commentItem}>
              <div className={style.commentHeader}>
                <span className={style.authorName}>
                  {comment.username.firstName} {comment.username.lastName}
                </span>
                <span className={style.date}>
                  {new Date(comment.postedAt).toLocaleString()}
                </span>
                <button
                  onClick={() => deleteComment(comment.id)}
                  className={style.deleteBtn}
                >
                  Delete
                </button>
              </div>
              <p className={style.content}>{comment.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={style.noComments}>No comments yet.</p>
      )}
    </div>
  );
}

export default ShowComments;

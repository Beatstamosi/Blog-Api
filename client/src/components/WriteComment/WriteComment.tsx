import { useState } from "react";
import { useAuth } from "../Authentication/useAuth";
import { Link, useNavigate } from "react-router-dom";

interface WriteCommentProps {
  postId: string;
}

function WriteComment({ postId }: WriteCommentProps) {
  const [comment, setComment] = useState("");
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/${postId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // if sending JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      }
    );

    if (result.ok) {
      navigate(0);
    } else {
      console.error("Failed to post comment");
    }
  };

  if (!isAuthenticated)
    return (
      <div>
        <Link to="/login">Login to write a comment.</Link>
      </div>
    );

  return (
    <div>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <textarea
          name="comment"
          id="comment"
          placeholder="Great Article!"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}

export default WriteComment;

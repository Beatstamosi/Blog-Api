import { useNavigate, useParams } from "react-router-dom";
import DisplayComment from "../DisplayComments/DisplayComment";
import WriteComment from "../WriteComment/WriteComment";
import { useEffect, useState } from "react";
import type { Post } from "../types/Post";
import style from "./DisplaySinglePost.module.css"; // 👈 Import CSS module

function DisplaySinglePost() {
  const [post, setPost] = useState<Post | undefined>();
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`
        );

        const data = await result.json();

        if (result.ok) {
          setPost(data.post);
        } else {
          navigate("/error");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [navigate, postId]);

  if (loading) return <div className={style.loading}>Loading...</div>;
  if (!post) return null;

  const publishedOn = new Date(post.createdAt).toDateString();
  const authorName = post.author.firstName + " " + post.author.lastName;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>{post.title}</h1>
        <div className={style.meta}>
          <span>By {authorName}</span>
          <span> | </span>
          <span>{publishedOn}</span>
        </div>
      </div>

      <div
        className={style.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      <div className={style.commentSection}>
        <h2>Leave a Comment</h2>
        <WriteComment postId={post.id} />
        <div className={style.comments}>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <DisplayComment comment={comment} key={comment.id} />
            ))
          ) : (
            <p className={style.noComments}>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplaySinglePost;

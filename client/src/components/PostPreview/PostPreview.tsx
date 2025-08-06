import { Link } from "react-router-dom";
import type { Post } from "../types/Post";
import style from "./PostPreview.module.css";

interface PostPreviewProps {
  post: Post;
}

function PostPreview({ post }: PostPreviewProps) {
  const previewText =
    post.content.slice(0, 50) + (post.content.length > 50 ? "..." : "");
  const publishedOn = new Date(post.createdAt).toDateString();
  const authorName = post.author.firstName + " " + post.author.lastName;

  return (
    <Link to={`/${post.id}`} className={style.card}>
      <h2>{post.title}</h2>
      <p>{previewText}</p>
      <p className={style.meta}>
        {publishedOn} by {authorName}
      </p>
    </Link>
  );
}

export default PostPreview;

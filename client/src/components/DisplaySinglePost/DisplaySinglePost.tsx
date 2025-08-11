import { useNavigate, useParams } from "react-router-dom";
import DisplayComment from "../DisplayComments/DisplayComment";
import WriteComment from "../WriteComment/WriteComment";
import { useEffect, useState } from "react";
import type { Post } from "../types/Post";

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

  if (loading) return <div>Loading...</div>;
  if (!post) return null;

  const publishedOn = new Date(post.createdAt).toDateString();
  const authorName = post.author.firstName + " " + post.author.lastName;

  return (
    <div>
      <div>
        <h1>{post.title}</h1>
        <span>By {authorName}</span>
        <span>{publishedOn}</span>
      </div>
      <div>{post.content}</div>
      <WriteComment postId={post.id} />
      <div>
        {post.comments.map((comment) => (
          <DisplayComment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}

export default DisplaySinglePost;

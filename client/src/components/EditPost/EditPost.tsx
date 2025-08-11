import style from "./WritePost.module.css";
import TextEditor from "../Author/AuthorHome/WritePost/Editor/Editor";
import type { TextEditorRefType } from "../Author/AuthorHome/WritePost/Editor/Editor";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import type { Post } from "../types/Post";

function EditPost() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | undefined>();
  const [title, setTitle] = useState(post?.title ?? "");
  const textEditorRef = useRef<TextEditorRefType>(null);
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

  const handleSubmit = async () => {
    const htmlContent = textEditorRef.current?.getContent();

    if (!htmlContent || !title.trim()) return;

    const result = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/posts//post/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          content: htmlContent,
        }),
      }
    );

    if (result.ok) {
      textEditorRef.current?.clear();
      setTitle("");
      navigate("/author");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return null;

  return (
    <>
      <NavBar />
      <div className={style.card}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="What a great day"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={style.editorWrapper}>
          <TextEditor ref={textEditorRef} content={post.content} />
        </div>

        <button onClick={handleSubmit}>Create Post</button>
      </div>
    </>
  );
}

export default EditPost;

// src/pages/Author/AuthorHome/WritePost/WritePost.tsx
import style from "./WritePost.module.css";
import TextEditor from "./Editor/Editor.js";
import type { TextEditorRef } from "./Editor/Editor.js";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function WritePost() {
  const [title, setTitle] = useState("");
  const editorRef = useRef<TextEditorRef>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const htmlContent = editorRef.current?.getContent();

    if (!htmlContent || !title.trim()) return;

    const result = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/posts/post`,
      {
        method: "POST",
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
      editorRef.current?.clear();
      setTitle("");
      navigate("/author");
    }
  };

  return (
    <div className={style.card}>
      <label htmlFor="title">Post Title</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="What a great day"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextEditor ref={editorRef} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default WritePost;

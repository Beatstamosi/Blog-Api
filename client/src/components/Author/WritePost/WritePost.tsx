import style from "./WritePost.module.css";
import TextEditor from "./Editor/Editor.js";
import type { TextEditorRefType } from "./Editor/Editor.js";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar.js";

function WritePost() {
  const [title, setTitle] = useState("");
  const textEditorRef = useRef<TextEditorRefType>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const htmlContent = textEditorRef.current?.getContent();

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
      textEditorRef.current?.clear();
      setTitle("");
      navigate("/author");
    }
  };

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
          <TextEditor ref={textEditorRef} />
        </div>

        <button onClick={handleSubmit}>Create Post</button>
      </div>
    </>
  );
}

export default WritePost;

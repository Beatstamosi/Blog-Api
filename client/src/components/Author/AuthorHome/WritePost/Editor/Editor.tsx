import { useImperativeHandle, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";

export type TextEditorRefType = {
  getContent: () => string;
  clear: () => void;
};

type Props = {
  ref?: React.Ref<TextEditorRefType>;
};

function TextEditor({ ref }: Props) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  useImperativeHandle(ref, () => ({
    getContent: () => editorRef.current?.getContent() || "",
    clear: () => editorRef.current?.setContent(""),
  }));

  return (
    <Editor
      apiKey={`${import.meta.env.VITE_TINYMCE_API_KEY}`}
      onInit={(_evt, editor) => {
        editorRef.current = editor;
      }}
      initialValue="<p>Write your article</p>"
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}

export default TextEditor;

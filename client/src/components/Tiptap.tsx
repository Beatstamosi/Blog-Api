import { useEditor, EditorContent } from "@tiptap/react";
import { useImperativeHandle, forwardRef } from "react";
import StarterKit from "@tiptap/starter-kit";

// Define a type for the methods we want to expose
export interface TiptapRef {
  getHTML: () => string | undefined;
  getJSON: () => Record<string, unknown> | undefined;
  clear: () => void;
}

const Tiptap = forwardRef<TiptapRef>((_, ref) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML(),
    getJSON: () => editor?.getJSON(),
    clear: () => editor?.commands.clearContent(),
  }));

  return <EditorContent editor={editor} />;
});

export default Tiptap;

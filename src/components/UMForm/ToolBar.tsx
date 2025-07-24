"use client";
import React, { useCallback, useRef } from "react";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Image,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

interface ToolbarOptionsProps {
  editor: Editor;
  content: string;
}

const Toolbar: React.FC<ToolbarOptionsProps> = ({ editor, content }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!editor || !event.target.files?.length) return;

      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          editor.chain().focus().setImage({ src: e.target.result }).run();
        }
      };

      reader.readAsDataURL(file);
      // Reset input value so the same file can be selected again
      event.target.value = "";
    },
    [editor]
  );

  const addImage = useCallback(() => {
    if (!editor || !imageInputRef.current) return;
    imageInputRef.current.click();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700 bg-white tiptap-toolbar">
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Italic className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("left").run();
          }}
          className={
            editor.isActive({ textAlign: "left" })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <AlignLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("center").run();
          }}
          className={
            editor.isActive({ textAlign: "center" })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <AlignCenter className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("right").run();
          }}
          className={
            editor.isActive({ textAlign: "right" })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <AlignRight className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button onClick={addImage} className={"text-sky-400"}>
          <Image className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCodeBlock().run();
          }}
          className={
            editor.isActive("codeBlock")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;

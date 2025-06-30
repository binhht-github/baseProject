import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    return (
        <div className="flex gap-2 mb-2">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "font-bold text-blue-600" : ""}
            >
                <strong>B</strong>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "italic text-blue-600" : ""}
            >
                <strong><i>I</i></strong>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive("underline") ? "underline text-blue-600" : ""}
            >
                <strong><u>U</u></strong>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive("heading", { level: 1 }) ? "text-blue-600" : ""}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive("heading", { level: 2 }) ? "text-blue-600" : ""}
            >
                H2
            </button>
        </div>
    );
};

export default function MyEditor() {
    const [content, setContent] = useState("");

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Placeholder.configure({
                placeholder: "Hãy bắt đầu nhập nội dung...",
            }),
        ],
        content: "<p>Xin chào bạn 👋</p>",
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });

    return (
        <div className="max-w-2xl mx-auto p-4 border rounded shadow-sm">
            <MenuBar editor={editor} />
            <div className="border rounded min-h-[150px] p-2 flex" onClick={() => editor?.commands.focus()}>
                <EditorContent className="min-h-[200px] h-[400px] w-full p-2 border rounded outline-none focus:outline-none" editor={editor} />
            </div>
            <h3 className="mt-4 font-semibold">Nội dung HTML:</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm">{content}</pre>
        </div>
    );
}

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Link as LinkIcon,
  Undo,
  Redo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
}

export function TiptapEditor({
  content,
  onChange,
  readOnly = false,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Comece a escrever seu artigo...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  // Update editable state when readOnly prop changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!readOnly);
    }
  }, [editor, readOnly]);

  // Update content if it changes externally (e.g. initial load)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  return (
    <div className={cn(
      "bg-[#111111] border border-white/10 rounded-2xl overflow-hidden flex flex-col",
      readOnly && "opacity-80"
    )}>
      {/* Toolbar - Hide if readOnly */}
      {!readOnly && (
        <div className="border-b border-white/10 p-2 flex flex-wrap gap-1 bg-[#1a1a1a]">
          <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
              title="Desfazer"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
              title="Refazer"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive("heading", { level: 1 }) &&
                  "bg-white/20 text-primary"
              )}
              title="Título 1"
            >
              <Heading1 className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive("heading", { level: 2 }) &&
                  "bg-white/20 text-primary"
              )}
              title="Título 2"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive("heading", { level: 3 }) &&
                  "bg-white/20 text-primary"
              )}
              title="Título 3"
            >
              <Heading3 className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive("bold") && "bg-white/20 text-primary"
              )}
              title="Negrito"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive("italic") && "bg-white/20 text-primary"
              )}
              title="Itálico"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive("underline") && "bg-white/20 text-primary"
              )}
              title="Sublinhado"
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive("strike") && "bg-white/20 text-primary"
              )}
              title="Tachado"
            >
              <Strikethrough className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive({ textAlign: "left" }) &&
                  "bg-white/20 text-primary"
              )}
              title="Alinhar à Esquerda"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive({ textAlign: "center" }) &&
                  "bg-white/20 text-primary"
              )}
              title="Centralizar"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive({ textAlign: "right" }) &&
                  "bg-white/20 text-primary"
              )}
              title="Alinhar à Direita"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("justify").run()}
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive({ textAlign: "justify" }) &&
                  "bg-white/20 text-primary"
              )}
              title="Justificar"
            >
              <AlignJustify className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive("bulletList") && "bg-white/20 text-primary"
              )}
              title="Lista com Marcadores"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive("orderedList") && "bg-white/20 text-primary"
              )}
              title="Lista Numerada"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors",
                editor.isActive("blockquote") && "bg-white/20 text-primary"
              )}
              title="Citação"
            >
              <Quote className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <EditorContent editor={editor} className="flex-1" />

      <style jsx global>{`
        .ProseMirror blockquote {
          border-left: 3px solid var(--primary);
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: #a3a3a3;
        }
        .ProseMirror h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }
        .ProseMirror h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .ProseMirror h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .ProseMirror li {
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
        }
        .ProseMirror p {
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }
      `}</style>
    </div>
  );
}

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
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
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, memo } from "react";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { Button } from "@/components/atoms/button";

interface TiptapEditorProps {
  content: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export const TiptapEditor = memo(function TiptapEditor({
  content,
  onChange,
  placeholder = "Escreva o conteúdo aqui...",
  readOnly = false,
}: TiptapEditorProps) {
  const debouncedOnChange = useDebouncedCallback((html: string) => {
    onChange?.(html);
  }, 300);

  const editor = useEditor({
    editable: !readOnly,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      debouncedOnChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-invert max-w-none focus:outline-none min-h-[300px] px-6 py-4",
          readOnly && "cursor-default"
        ),
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
    if (editor && content !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  return (
    <div className={cn(
      "bg-surface border border-white/10 rounded-2xl overflow-hidden flex flex-col",
      readOnly && "opacity-80"
    )}>
      {/* Toolbar - Hide if readOnly */}
      {!readOnly && (
        <div className="border-b border-white/10 p-2 flex flex-wrap gap-1 bg-surface-highlight">
          <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="hover:bg-white/10 text-white disabled:opacity-30"
              title="Desfazer"
              aria-label="Desfazer"
            >
              <Undo className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="hover:bg-white/10 text-white disabled:opacity-30"
              title="Refazer"
              aria-label="Refazer"
            >
              <Redo className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive("heading", { level: 1 }) &&
                  "bg-white/20 text-primary"
              )}
              title="Título 1"
              aria-label="Título 1"
            >
              <Heading1 className="size-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive("heading", { level: 2 }) &&
                  "bg-white/20 text-primary"
              )}
              title="Título 2"
              aria-label="Título 2"
            >
              <Heading2 className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive("heading", { level: 3 }) &&
                  "bg-white/20 text-primary"
              )}
              title="Título 3"
              aria-label="Título 3"
            >
              <Heading3 className="size-3" />
            </Button>
          </div>

          <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive("bold") && "bg-white/20 text-primary"
              )}
              title="Negrito"
              aria-label="Negrito"
            >
              <Bold className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive("italic") && "bg-white/20 text-primary"
              )}
              title="Itálico"
              aria-label="Itálico"
            >
              <Italic className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive("underline") && "bg-white/20 text-primary"
              )}
              title="Sublinhado"
              aria-label="Sublinhado"
            >
              <UnderlineIcon className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive("strike") && "bg-white/20 text-primary"
              )}
              title="Tachado"
              aria-label="Tachado"
            >
              <Strikethrough className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive({ textAlign: "left" }) &&
                  "bg-white/20 text-primary"
              )}
              title="Alinhar à Esquerda"
              aria-label="Alinhar à Esquerda"
            >
              <AlignLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive({ textAlign: "center" }) &&
                  "bg-white/20 text-primary"
              )}
              title="Centralizar"
              aria-label="Centralizar"
            >
              <AlignCenter className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive({ textAlign: "right" }) &&
                  "bg-white/20 text-primary"
              )}
              title="Alinhar à Direita"
              aria-label="Alinhar à Direita"
            >
              <AlignRight className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().setTextAlign("justify").run()}
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive({ textAlign: "justify" }) &&
                  "bg-white/20 text-primary"
              )}
              title="Justificar"
              aria-label="Justificar"
            >
              <AlignJustify className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive("bulletList") && "bg-white/20 text-primary"
              )}
              title="Lista com Marcadores"
              aria-label="Lista com Marcadores"
            >
              <List className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive("orderedList") && "bg-white/20 text-primary"
              )}
              title="Lista Numerada"
              aria-label="Lista Numerada"
            >
              <ListOrdered className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={cn(
                "hover:bg-white/10 text-white",
                editor.isActive("blockquote") && "bg-white/20 text-primary"
              )}
              title="Citação"
              aria-label="Citação"
            >
              <Quote className="size-4" />
            </Button>
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
          color: var(--muted-foreground);
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
});

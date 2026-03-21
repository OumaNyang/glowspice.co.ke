"use client";

import { useRef, useEffect } from "react";
import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync external value changes safely
  useEffect(() => {
    if (editorRef.current && document.activeElement !== editorRef.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value]);

  const execCommand = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    editorRef.current?.focus();
    handleChange();
  };

  const handleChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="w-full border border-[var(--border)] rounded-md overflow-hidden bg-white focus-within:border-[var(--spice)] transition-colors shadow-sm">
      <div className="flex items-center gap-1 p-2 border-b border-[var(--border)] bg-[var(--gray-50)] overflow-x-auto">
        <button type="button" onClick={() => execCommand("bold")} className="p-1.5 text-[var(--gray-600)] hover:text-[var(--bark)] hover:bg-[var(--cream-dark)] rounded transition-colors"><Bold size={14} /></button>
        <button type="button" onClick={() => execCommand("italic")} className="p-1.5 text-[var(--gray-600)] hover:text-[var(--bark)] hover:bg-[var(--cream-dark)] rounded transition-colors"><Italic size={14} /></button>
        <button type="button" onClick={() => execCommand("underline")} className="p-1.5 text-[var(--gray-600)] hover:text-[var(--bark)] hover:bg-[var(--cream-dark)] rounded transition-colors"><Underline size={14} /></button>
        <div className="w-px h-4 bg-[var(--border)] mx-1" />
        <button type="button" onClick={() => execCommand("insertUnorderedList")} className="p-1.5 text-[var(--gray-600)] hover:text-[var(--bark)] hover:bg-[var(--cream-dark)] rounded transition-colors"><List size={14} /></button>
        <button type="button" onClick={() => execCommand("insertOrderedList")} className="p-1.5 text-[var(--gray-600)] hover:text-[var(--bark)] hover:bg-[var(--cream-dark)] rounded transition-colors"><ListOrdered size={14} /></button>
      </div>
      <div
        ref={editorRef}
        className="w-full p-4 min-h-[160px] max-h-[400px] overflow-y-auto text-sm focus:outline-none custom-scrollbar text-[var(--bark)] leading-relaxed"
        contentEditable
        onInput={handleChange}
        onBlur={handleChange}
        data-placeholder={placeholder}
      />
      {/* Basic style for placeholder injection via CSS if empty */}
      <style dangerouslySetInnerHTML={{__html: `
        div[contentEditable]:empty:not(:focus):before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}} />
    </div>
  );
}

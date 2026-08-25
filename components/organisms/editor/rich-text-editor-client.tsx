"use client";

import { Button } from "@/components/ui";
import { Bold, Italic, Link, List, ListOrdered } from "lucide-react";
import { useEffect, useRef } from "react";
export default function RichTextEditorClient({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const runCommand = (command: string) => {
    editorRef.current?.focus();
    document.execCommand(command);
    onChange(editorRef.current?.innerHTML ?? "");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-slate-200 p-2">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => runCommand("bold")}
          aria-label="In đậm"
        >
          <Bold />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => runCommand("italic")}
          aria-label="In nghiêng"
        >
          <Italic />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => runCommand("insertUnorderedList")}
          aria-label="Danh sách"
        >
          <List />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => runCommand("insertOrderedList")}
          aria-label="Danh sách đánh số"
        >
          <ListOrdered />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => {
            const url = window.prompt("Nhập liên kết");
            if (url) document.execCommand("createLink", false, url);
            onChange(editorRef.current?.innerHTML ?? "");
          }}
          aria-label="Chèn liên kết"
        >
          <Link />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        className="min-h-60 p-3 text-sm outline-none"
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
      />
    </div>
  );
}

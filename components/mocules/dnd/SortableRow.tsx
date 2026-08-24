// components/dnd/SortableRow.tsx
"use client";

import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import type { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
  id: UniqueIdentifier;
  children: React.ReactNode;
  className?: string;
};

export function SortableRow({ id, children, className }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className ?? ""} ${isDragging ? "z-50 opacity-50" : ""}`}
      {...attributes}
    >
      {typeof children === "function"
        ? children({
            listeners,
          })
        : children}
    </div>
  );
}

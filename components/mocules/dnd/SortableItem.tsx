// components/dnd/SortableItem.tsx
"use client";

import { useSortable } from "@dnd-kit/sortable";

import type { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
  id: UniqueIdentifier;
  children: (props: {
    setNodeRef: (element: HTMLElement | null) => void;
    attributes: ReturnType<typeof useSortable>["attributes"];
    listeners: ReturnType<typeof useSortable>["listeners"];
    transform: ReturnType<typeof useSortable>["transform"];
    transition: ReturnType<typeof useSortable>["transition"];
    isDragging: boolean;
  }) => React.ReactNode;
};

export function SortableItem({ id, children }: Props) {
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

  return children({
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  });
}

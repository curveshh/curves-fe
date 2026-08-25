// components/dnd/DragHandle.tsx
"use client";

import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListeners } from "@dnd-kit/core/dist/hooks/utilities";

type Props = {
  attributes: DraggableAttributes;
  listeners?: SyntheticListeners;
  children: React.ReactNode;
};

export function DragHandle({ attributes, listeners, children }: Props) {
  return (
    <button
      type="button"
      {...attributes}
      {...listeners}
      className="cursor-grab touch-none active:cursor-grabbing"
    >
      {children}
    </button>
  );
}

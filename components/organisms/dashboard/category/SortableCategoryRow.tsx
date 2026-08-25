"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { CategoryRow } from "./CategoryRow";

type Props = React.ComponentProps<typeof CategoryRow> & {
  id: number;
};

export const SortableCategoryRow = ({ id, ...props }: Props) => {
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

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={isDragging ? "relative z-50 opacity-50" : undefined}
    >
      <CategoryRow
        {...props}
        dragAttributes={attributes}
        dragListeners={listeners}
      />
    </div>
  );
};

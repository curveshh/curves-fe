"use client";

import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import { Badge, Button } from "@/components/ui";
import { CategoryItem } from "@/types/category";

type Props = {
  item: CategoryItem;
  active: boolean;
  nested?: boolean;
  expanded?: boolean;

  onSelect: (item: CategoryItem) => void;
  onToggle?: () => void;
  onDelete: () => void;

  dragAttributes?: DraggableAttributes;
  dragListeners?: SyntheticListenerMap;
};

export const CategoryRow = ({
  item,
  active,
  nested = false,
  expanded = false,
  onSelect,
  onToggle,
  onDelete,
  dragAttributes,
  dragListeners,
}: Props) => {
  const hasChildren = Boolean(item.children?.length);

  return (
    <div
      className={`group flex items-center gap-2 rounded-lg border px-2 py-2 transition-colors ${
        nested ? "ml-7 border-dashed" : ""
      } ${active ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
    >
      {/* Drag handle */}
      <button
        type="button"
        {...dragAttributes}
        {...dragListeners}
        className="touch-none cursor-grab text-muted-foreground active:cursor-grabbing"
        aria-label="Reorder category"
      >
        <GripVertical className="size-4" />
      </button>

      {/* Expand */}
      {hasChildren ? (
        <Button type="button" variant="ghost" size="icon-xs" onClick={onToggle}>
          {expanded ? <ChevronDown /> : <ChevronRight />}
        </Button>
      ) : (
        <span className="w-6 shrink-0" />
      )}

      {/* Category */}
      <button
        type="button"
        className="flex min-w-0 flex-1 items-center gap-2 text-left"
        onClick={() => onSelect(item)}
      >
        <span className="truncate font-medium">{item.name}</span>

        <span className="hidden truncate text-xs text-muted-foreground sm:inline">
          /{item.slug}
        </span>
      </button>

      {/* Status */}
      <Badge variant={item.active ? "secondary" : "outline"}>
        {item.active ? "Visible" : "Hidden"}
      </Badge>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => onSelect(item)}
          aria-label="Edit category"
        >
          <Pencil />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={onDelete}
          aria-label="Delete category"
        >
          <Trash2 className="text-destructive" />
        </Button>
      </div>
    </div>
  );
};

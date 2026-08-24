import { CategoryItem } from "@/types/category";
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge, Button } from "../ui";

type Props = {
  item: CategoryItem;
  active: boolean;
  nested?: boolean;
  expanded?: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onSelect: (item: CategoryItem) => void;
  onToggle?: () => void;
  onMove: (direction: -1 | 1) => void;
  onDelete: () => void;
};

export const CategoryRow = ({
  item,
  active,
  nested = false,
  expanded = false,
  canMoveUp,
  canMoveDown,
  onSelect,
  onToggle,
  onMove,
  onDelete,
}: Props) => {
  const hasChildren = Boolean(item.children?.length);
  return (
    <div
      className={`group flex items-center gap-2 rounded-lg border px-2 py-2 transition-colors ${nested ? "ml-7 border-dashed" : ""} ${active ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
    >
      <GripVertical
        className="size-4 shrink-0 text-muted-foreground"
        aria-label="Reorder category"
      />
      {hasChildren ? (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onToggle}
          aria-label="Toggle sub-categories"
        >
          {expanded ? <ChevronDown /> : <ChevronRight />}
        </Button>
      ) : (
        <span className="w-6" />
      )}
      <button
        type="button"
        className="flex min-w-0 flex-1 items-center gap-2 text-left"
        onClick={() => {
          onSelect(item);
          console.log("item:", item);
        }}
      >
        <span className="truncate font-medium">{item.name}</span>
        <span className="hidden truncate text-xs text-muted-foreground sm:inline">
          /{item.slug}
        </span>
      </button>
      <Badge variant={item.active ? "secondary" : "outline"}>
        {item.active ? "Visible" : "Hidden"}
      </Badge>
      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon-xs"
          disabled={!canMoveUp}
          onClick={() => onMove(-1)}
          aria-label="Move up"
        >
          ↑
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          disabled={!canMoveDown}
          onClick={() => onMove(1)}
          aria-label="Move down"
        >
          ↓
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => onSelect(item)}
          aria-label="Edit category"
        >
          <Pencil />
        </Button>
        <Button
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

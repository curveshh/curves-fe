"use client";

import { DndProvider } from "@/components/mocules/dnd/DndContextProvider";
import { useCategory } from "@/hooks/useCategory";
import { useCategoryStore } from "@/stores/category";
import { CategoryItem } from "@/types/category";

import { DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Fragment, useEffect, useState } from "react";
import { SortableCategoryRow } from "./SortableCategoryRow";

export const CategoryList = () => {
  const { list, remove, move } = useCategory();

  const { setCategorySelected, categorySelected } = useCategoryStore();

  const [categories, setCategories] = useState<CategoryItem[]>(list.data ?? []);

  const [expanded, setExpanded] = useState<string[]>([
    "vehicles",
    "accessories",
  ]);

  useEffect(() => {
    setCategories(list.data ?? []);
  }, [list.data]);

  /**
   * Find category + parent
   */
  const findCategory = (
    id: String,
    items: CategoryItem[] = categories,
    parentId: number | null = null,
  ): {
    item: CategoryItem;
    parentId: number | null;
    siblings: CategoryItem[];
  } | null => {
    const index = items.findIndex((item) => String(item.id) === id);

    if (index !== -1) {
      return {
        item: items[index],
        parentId,
        siblings: items,
      };
    }

    for (const item of items) {
      if (!item.children?.length) {
        continue;
      }
      const result = findCategory(id, item.children, item.id);
      if (result) {
        return result;
      }
    }

    return null;
  };

  /**
   * Optimistic reorder
   */
  const reorderCategories = (
    items: CategoryItem[],
    activeId: String,
    overId: String,
  ): CategoryItem[] => {
    const oldIndex = items.findIndex((item) => String(item.id) === activeId);

    const newIndex = items.findIndex((item) => String(item.id) === overId);

    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
      return items;
    }

    const next = [...items];

    const [moved] = next.splice(oldIndex, 1);

    next.splice(newIndex, 0, moved);

    return next;
  };

  /**
   * Reorder root
   */
  const reorderRoot = (activeId: String, overId: String) => {
    setCategories((current) => reorderCategories(current, activeId, overId));
  };

  /**
   * Reorder children của một parent
   */
  const reorderChildren = (
    parentId: String,
    activeId: String,
    overId: String,
  ) => {
    setCategories((current) =>
      current.map((category) => {
        if (String(category.id) !== parentId) {
          return category;
        }

        return {
          ...category,
          children: reorderCategories(
            category.children ?? [],
            activeId,
            overId,
          ),
        };
      }),
    );
  };

  /**
   * Handle drag end
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId === overId) {
      return;
    }

    const activeCategory = findCategory(activeId);

    const overCategory = findCategory(overId);

    if (!activeCategory || !overCategory) {
      return;
    }

    /**
     * Chỉ cho reorder trong cùng cấp.
     *
     * Root -> root
     * Child -> cùng parent
     */
    if (activeCategory.parentId !== overCategory.parentId) {
      return;
    }

    /**
     * Snapshot để rollback
     */
    const previousCategories = categories;

    /**
     * Optimistic update
     */
    if (activeCategory.parentId === null) {
      reorderRoot(activeId, overId);
    } else {
      reorderChildren(String(activeCategory.parentId), activeId, overId);
    }

    /**
     * Tìm order mới
     */
    const siblings = activeCategory.siblings;

    const oldIndex = siblings.findIndex((item) => String(item.id) === activeId);

    const newIndex = siblings.findIndex((item) => String(item.id) === overId);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    /**
     * Gọi API
     */
    move.mutate(
      {
        id: activeId,
        parentId: activeCategory.parentId
          ? Number(activeCategory.parentId)
          : null,
        order: newIndex,
      },
      {
        onError: () => {
          /**
           * Rollback
           */
          setCategories(previousCategories);
        },

        onSuccess: () => {
          /**
           * Không cần rollback
           */
        },
      },
    );
  };

  return (
    <DndProvider onDragEnd={handleDragEnd}>
      {/* ROOT CATEGORIES */}
      <SortableContext
        items={categories.map((category) => category.id)}
        strategy={verticalListSortingStrategy}
      >
        {categories.map((category) => (
          <Fragment key={category.id}>
            <SortableCategoryRow
              id={category.id}
              item={category}
              active={categorySelected?.id === category.id}
              expanded={expanded.includes(String(category.id))}
              onSelect={setCategorySelected}
              onToggle={() =>
                setExpanded((current) =>
                  current.includes(category.id)
                    ? current.filter((item) => item !== category.id)
                    : [...current, category.id],
                )
              }
              onDelete={() => remove.mutate(String(category.id))}
            />

            {/* CHILDREN */}
            {expanded.includes(String(category.id)) &&
              category.children &&
              category.children.length > 0 && (
                <SortableContext
                  items={category.children.map((child) => child.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {category.children.map((child) => (
                    <SortableCategoryRow
                      key={child.id}
                      id={child.id}
                      item={child}
                      nested
                      active={categorySelected?.id === child.id}
                      onSelect={setCategorySelected}
                      onDelete={() => remove.mutate(String(child.id))}
                    />
                  ))}
                </SortableContext>
              )}
          </Fragment>
        ))}
      </SortableContext>
    </DndProvider>
  );
};

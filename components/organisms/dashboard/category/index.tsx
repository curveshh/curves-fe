"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useCategoryStore } from "@/stores/category";
import { Plus } from "lucide-react";
import { CategoryForm } from "./CategoryForm";
import { CategoryList } from "./CategoryList";

export const CategoryComponent = () => {
  const { setCategorySelected } = useCategoryStore();

  const resetForm = () => {
    setCategorySelected(null);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Content management</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Categories
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Organise menu categories and their sub-categories.
          </p>
        </div>
        <Button onClick={resetForm}>
          <Plus /> Add category
        </Button>
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.85fr)]">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Category structure</CardTitle>
            <CardDescription>
              Use the move controls to arrange categories, as in WordPress.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5 flex flex-col gap-3">
            <CategoryList />
          </CardContent>
        </Card>
        <CategoryForm />
      </div>
    </div>
  );
};

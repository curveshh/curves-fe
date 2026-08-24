"use client";

import { BaseFormField } from "@/components/atoms/FieldForm";
import { BaseFormSwitch } from "@/components/atoms/SwitchForm";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@/components/ui";
import { useCategory } from "@/hooks/useCategory";
import { slugify } from "@/lib/utils";
import { CategoryFormValues, categorySchema } from "@/schemas/category";
import { useCategoryStore } from "@/stores/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const CategoryForm = () => {
  const { create, update } = useCategory();
  const { categorySelected, setCategorySelected } = useCategoryStore();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      parentId: null,
      isActive: true,
    },
  });

  const {
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = form;

  const name = watch("name");

  const resetForm = () => {
    setCategorySelected(null);

    reset({
      name: "",
      slug: "",
      parentId: null,
      isActive: true,
    });
  };

  const onSubmit = async (values: CategoryFormValues) => {
    if (categorySelected) {
      await update.mutateAsync({
        id: String(categorySelected.id),
        data: values,
      });
    } else {
      await create.mutateAsync(values);
    }

    resetForm();
  };

  useEffect(() => {
    if (!categorySelected?.id && name) {
      setValue("slug", slugify(name), {
        shouldValidate: true,
      });
    }
  }, [name, categorySelected, setValue]);

  useEffect(() => {
    if (!categorySelected) return;

    form.reset({
      name: categorySelected.name ?? "",
      slug: categorySelected.slug ?? "",
      parentId: null,
      isActive: categorySelected.active ?? true,
    });
  }, [categorySelected, form]);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>
          {categorySelected ? "Edit category" : "Add category"}
        </CardTitle>

        <CardDescription>
          Set a parent to create a sub-category.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* Name */}
            <div className="space-y-2">
              <BaseFormField name="name" label="Tiêu đề" required>
                {(field) => <Input {...field} placeholder="Nhập tiêu đề" />}
              </BaseFormField>
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <BaseFormField name="slug" label="Slug" required>
                {(field) => <Input {...field} placeholder="Nhập tiêu đề" />}
              </BaseFormField>
            </div>

            {/* Active */}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <BaseFormSwitch
                name="isActive"
                label="Hiển thị banner"
                description="Banner sẽ được hiển thị trên trang chủ"
                disabled={false}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : categorySelected
                    ? "Save changes"
                    : "Create category"}
              </Button>

              {categorySelected && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

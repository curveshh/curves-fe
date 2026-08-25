"use client";

import {
  Controller,
  useFormContext,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";

export type BaseFormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;

  children: (
    field: ControllerRenderProps<TFieldValues, TName>,
  ) => React.ReactNode;
};

export function BaseFormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  required,
  className,
  children,
}: BaseFormFieldProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("space-y-1", className)}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="ml-1 text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>{children(field)}</FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

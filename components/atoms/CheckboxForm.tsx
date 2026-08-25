"use client";

import {
  Checkbox,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

type BaseFormCheckboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  classNameControl?: string;
  onChange?: (checked: boolean) => void;
};

export function BaseFormCheckbox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  disabled,
  className,
  classNameControl,
  onChange,
}: BaseFormCheckboxProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();
  const id = `checkbox-${String(name).replace(/\./g, "-")}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={Boolean(field.value)}
              onCheckedChange={(checked) => {
                const value = checked === true;
                // Update React Hook Form
                field.onChange(value);
                // Custom callback
                onChange?.(value);
              }}
              disabled={disabled}
              className={classNameControl}
            />
            <div className="space-y-1">
              {label && (
                <FormLabel
                  className="cursor-pointer text-xs font-medium"
                  htmlFor={id}
                >
                  {label}
                </FormLabel>
              )}

              {description && <FormDescription>{description}</FormDescription>}
            </div>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

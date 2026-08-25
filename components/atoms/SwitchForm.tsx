"use client";

import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

import { Switch } from "@/components/ui";

type BaseFormSwitchProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  classNameControl?: string;
};

export function BaseFormSwitch<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  disabled,
  className,
  classNameControl,
}: BaseFormSwitchProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              {label && (
                <FormLabel className="text-sm font-medium">{label}</FormLabel>
              )}

              {description && <FormDescription>{description}</FormDescription>}
            </div>

            <Switch
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className={classNameControl}
            />
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

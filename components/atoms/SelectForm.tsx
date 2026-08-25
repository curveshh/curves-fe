"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { BaseFormField, BaseFormFieldProps } from "./FieldForm";

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type BaseFormSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<BaseFormFieldProps<TFieldValues, TName>, "children"> & {
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
};

export function BaseFormSelect<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  options,
  placeholder = "Chọn một giá trị",
  disabled,
  ...props
}: BaseFormSelectProps<TFieldValues, TName>) {
  return (
    <BaseFormField {...props}>
      {(field) => (
        <Select
          value={field.value ?? ""}
          onValueChange={field.onChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent className="bg-white">
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </BaseFormField>
  );
}

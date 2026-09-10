import { cn } from "@/lib/utils";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "../ui";

interface BaseFormInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  isRequire?: boolean;
}

export function BaseFormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  isRequire = false,
  ...props
}: BaseFormInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="relative">
          {label && (
            <FormLabel>
              {label}
              {isRequire && <span className="text-red-400">*</span>}
            </FormLabel>
          )}

          <FormControl>
            {type === "textarea" ? (
              <Textarea
                {...field}
                placeholder={placeholder}
                rows={5}
                className={cn(
                  fieldState.error &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
                {...props}
              />
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                className={cn(
                  fieldState.error &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
                {...props}
              />
            )}
          </FormControl>

          <FormMessage className="text-red-500 text-sm -bottom-5 absolute" />
        </FormItem>
      )}
    />
  );
}

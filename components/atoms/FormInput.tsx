import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../ui";

interface BaseFormInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?: string;
}

export function BaseFormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
}: BaseFormInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Input {...field} type={type} placeholder={placeholder} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

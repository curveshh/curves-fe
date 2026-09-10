import { BaseFormInput } from "@/components/atoms/FormInput";
import { useCustomer } from "@/hooks/useCustomer";
import { CustomerFormValues, customerSchema } from "@/schemas/customer";
import { Channel, CHANNELS } from "@/types/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

export const SocialForm = ({
  channel,
  formId,
}: {
  channel: Channel;
  formId: string;
}) => {
  const { create } = useCustomer(channel);
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      zalo: "",
      phone: "",
      facebookUrl: "",
      note: "",
      type: channel,
    },
  });

  const handleSubmit = (data: CustomerFormValues) => {
    create.mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
      >
        <BaseFormInput
          name="name"
          label="Tên người dùng"
          placeholder="Nhập tên người dùng"
        />
        {channel === CHANNELS.ZALO && (
          <BaseFormInput
            name="zalo"
            label="Zalo ID"
            placeholder="Nhập Zalo ID"
          />
        )}
        {channel === CHANNELS.FACEBOOK && (
          <BaseFormInput
            name="facebookUrl"
            label="Đường dẫn Facebook"
            placeholder="https://facebook.com/username"
          />
        )}
        <BaseFormInput
          type="textarea"
          name="note"
          label="Ghi chú"
          placeholder="Nhập ghi chú"
        />
      </form>
    </FormProvider>
  );
};

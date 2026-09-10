"use client";

import { BaseFormInput } from "@/components/atoms/FormInput";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useContact } from "@/hooks/useContact";
import { Contact, contactSchema } from "@/schemas/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  contact: Contact;
};

export const SettingContacts = ({ contact }: Props) => {
  const route = useRouter();
  const { update } = useContact();
  const form = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      facebook: "",
      zalo: "",
      hotline: "",
    },
  });

  const onsubmit = async (values: Contact) => {
    await update.mutateAsync(values);
    route.refresh();
  };

  useEffect(() => {
    form.setValues({ ...contact });
  }, [contact, form]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)}>
        <Card className="mx-auto w-full gap-2">
          <CardHeader>
            <CardTitle>Cài đặt liên hệ</CardTitle>
            <CardDescription>Số điện thoại, zalo, facebook</CardDescription>
          </CardHeader>
          <CardContent className="-mb-(--card-spacing) px-2">
            <div className="border-t bg-muted/50 py-4 text-sm leading-relaxed grid grid-cols-1 md:grid-cols-3 gap-3">
              <BaseFormInput name="hotline" label="Hotline" />
              <BaseFormInput name="zalo" label="Zalo" />
              <BaseFormInput name="facebook" label="Facebook" />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button type="submit">Lưu</Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};

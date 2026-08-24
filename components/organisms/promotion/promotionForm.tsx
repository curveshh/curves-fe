"use client";

import { BaseFormCheckbox } from "@/components/atoms/CheckboxForm";
import { BaseFormField } from "@/components/atoms/FieldForm";
import { BaseFormInput } from "@/components/atoms/FormInput";
import { PromotionCard } from "@/components/atoms/PromotionCard";
import { BaseFormSelect } from "@/components/atoms/SelectForm";
import { ImageDropzone } from "@/components/dashboard/image-dropzone";
import { Button, Card } from "@/components/ui";
import { BG_PRESETS, BG_TYPE, TYPE } from "@/contants/promotion";
import { usePromotion } from "@/hooks/usePromotion";
import { useUpload } from "@/hooks/useUpload";
import { toDatetimeLocal } from "@/lib/utils";
import { Promotion, promotionFormSchema } from "@/schemas/promotion";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

type Props = {
  initialValues?: Promotion | null;
};

export function PromotionForm({ initialValues = null }: Props) {
  const router = useRouter();
  const { create, update } = usePromotion("");
  const { uploadImages } = useUpload();
  const form = useForm<Promotion>({
    resolver: zodResolver(promotionFormSchema),
    defaultValues: initialValues
      ? {
          ...initialValues,
          endDate: toDatetimeLocal(initialValues.endDate || ""),
        }
      : {
          badge: "",
          title: "",
          discount: "",
          extra: "",
          ctaText: "",
          footerText: "",
          footerLink: "",
          endDate: "",
          showOnHome: false,
          bgType: TYPE.GRADIENT,
          bgFrom: "",
          bgTo: "",
          imageUrl: "",
          image: null,
          order: 0,
          bgGradient: "",
        },
  });
  const values = useWatch({
    control: form.control,
  });

  const onSubmit = async (values: Promotion) => {
    const { image, bgGradient, ...draft } = values;
    const uploadedCoverImageUrl = image
      ? (await uploadImages.mutateAsync(image)).data.url
      : values.imageUrl;
    const payload = {
      ...draft,
      imageUrl: uploadedCoverImageUrl,
    };
    if (values.id) {
      await update.mutateAsync({ id: values.id, data: payload });
      return;
    }
    await create.mutateAsync(payload);
  };

  const previewImage = useMemo(() => {
    if (values.image instanceof File) {
      return URL.createObjectURL(values.image);
    }

    return values.imageUrl || "";
  }, [values.image, values.imageUrl]);

  useEffect(() => {
    return () => {
      if (values.image instanceof File) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage, values.image]);

  useEffect(() => {
    if (values.bgType === TYPE.GRADIENT && values.bgGradient) {
      const splitValue = values.bgGradient.split("-");
      form.setValues({
        bgFrom: splitValue[0],
        bgTo: splitValue[1],
      });
    }
  }, [values.bgGradient]);

  return (
    <main className="px-8 py-4">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-1 text-xs text-violet-500">Khuyến mãi</div>
          <h1 className="text-lg font-extrabold uppercase text-[#2b1745]">
            {initialValues ? "Chỉnh sửa khuyến mãi" : "Thêm khuyến mãi"}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Cập nhật thông tin khuyến mãi trên trang chủ
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            className="text-xs text-slate-600"
            onClick={() => router.back()}
          >
            <ArrowLeft /> Quay lại danh sách
          </Button>
          {initialValues && (
            <Button
              type="button"
              variant="outline"
              className="border-rose-200 text-xs text-rose-500"
            >
              <Trash2 /> Xóa khuyến mãi
            </Button>
          )}
        </div>
      </div>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <section className="col-span-2 lg:col-span-3">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <BaseFormInput
                  name="badge"
                  placeholder="ƯU ĐÃI HOT TRONG THÁNG"
                />

                <BaseFormInput name="title" placeholder="GÓI TẬP 12 THÁNG" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <BaseFormInput name="discount" placeholder="GIẢM NGAY 30%" />

                <BaseFormInput
                  name="extra"
                  placeholder="+ TẶNG 01 THÁNG TẬP & ÁO CURVES"
                />
              </div>

              <BaseFormInput name="ctaText" placeholder="ĐĂNG KÝ NGAY" />

              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <BaseFormInput
                  name="footerText"
                  placeholder="Xem chi tiết chương trình"
                />

                <BaseFormInput
                  name="footerLink"
                  placeholder="https://curvesvietnam.com/uu-dai"
                />
              </div>

              <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                <BaseFormSelect
                  name="bgType"
                  options={BG_TYPE}
                  placeholder="Chọn background"
                />

                {values.bgType === TYPE.IMAGE && (
                  <Card className="border-slate-100 p-3.5 shadow-sm col-span-3">
                    <h2 className="mb-3 text-sm font-bold text-[#2b1745]">
                      Hình ảnh banner
                    </h2>
                    <BaseFormField name="image" label="Ảnh nền">
                      {(field) => (
                        <ImageDropzone
                          value={values.image ?? values.imageUrl}
                          onChange={(value) => {
                            if (value instanceof File) {
                              const previewUrl = URL.createObjectURL(value);

                              field.onChange(value);

                              form.setValue("imageUrl", previewUrl, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            } else {
                              field.onChange(null);

                              form.setValue("imageUrl", "", {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            }
                          }}
                          compact
                          acceptLabel="JPG, PNG, WEBP"
                        />
                      )}
                    </BaseFormField>
                    <p className="mt-2 text-[10px] text-slate-400">
                      Định dạng: JPG, PNG, WEBP. Kích thước đề nghị: 1920×600px.
                      Tối đa: 2MB.
                    </p>
                  </Card>
                )}

                {values.bgType === TYPE.GRADIENT && (
                  <BaseFormSelect
                    options={BG_PRESETS.map((preset) => ({
                      label: preset.name,
                      value: `${preset.from}-${preset.to}`,
                    }))}
                    name="bgGradient"
                  />
                )}

                <BaseFormInput
                  name="endDate"
                  type="datetime-local"
                  placeholder="Nhập ngày kết thuc"
                  label="Ngày kết thúc khuyến mãi"
                />
              </div>

              <BaseFormCheckbox name="showOnHome" label="Hiển thị trang chủ" />

              <div className="flex justify-end">
                <Button type="submit">Lưu khuyến mãi</Button>
              </div>
            </form>
          </FormProvider>
        </section>

        <section className="col-span-2 lg:col-span-1 h-100 pb-4">
          <PromotionCard
            promo={{
              badge: values.badge,
              title: values.title || "",
              discount: values.discount,
              extra: values.extra,
              ctaText: values.ctaText,
              footerText: values.footerText,
              footerLink: values.footerLink,
              endDate: values.endDate,
              bgType: values.bgType || "GRADIENT",
              bgFrom: values.bgFrom,
              bgTo: values.bgTo,
              imageUrl: values.imageUrl,
            }}
          />
        </section>
      </section>
    </main>
  );
}

"use client";

import { BaseFormCheckbox } from "@/components/atoms/CheckboxForm";
import { PromotionCard } from "@/components/atoms/PromotionCard";
import { Button, Input } from "@/components/ui";
import { ROUTE } from "@/contants/route";
import { useDebounce } from "@/hooks/useDebounce";
import { usePromotion } from "@/hooks/usePromotion";
import { Promotion } from "@/schemas/promotion";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const PromotionListComponent = () => {
  const route = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 500);
  const { list, remove, update } = usePromotion(debouncedValue);

  const form = useForm<{ promotions: Promotion[] }>({
    defaultValues: {
      promotions: [],
    },
  });

  const addPromotion = () => {
    route.push(ROUTE.DASHBOARD_PROMOTIONS_NEW);
  };

  const onSearchPromotion = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEdit = (promotion: Promotion) => {
    route.push(
      ROUTE.DASHBOARD_PROMOTIONS_EDIT.replace(":id", String(promotion.id)),
    );
  };

  const handleDelete = (promotion: Promotion) => {
    remove.mutate(promotion.id);
  };

  const onChangeShowHome = (promotion: Promotion, showOnHome: boolean) => {
    update.mutate({
      id: promotion.id,
      data: { ...promotion, showOnHome },
    });
  };

  useEffect(() => {
    form.reset({
      promotions: list.data ?? [],
    });
  }, [list.data, form]);

  return (
    <main className="min-h-screen bg-[#f6f4f9] p-5 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-purple-950">
              Quản lý Banner
            </h1>
            <p className="text-sm text-purple-400">
              Thiết lập slideshow ảnh hiển thị trên trang chủ
            </p>
          </div>
          <Button
            onClick={addPromotion}
            className="bg-purple-700 hover:bg-purple-800"
          >
            <Plus /> Thêm khuyến mãi mới
          </Button>
        </div>
        <div>
          <Input
            placeholder="Tìm kiếm khuyến mãi"
            value={value}
            onChange={onSearchPromotion}
          />
        </div>

        <section className="my-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FormProvider {...form}>
            {list.data?.map((promotion, index) => (
              <section
                key={promotion.id}
                className="group relative border border-slate-200 shadow-2xl rounded-2xl"
              >
                {/* Toolbar */}
                <div className="mb-2 flex items-center justify-between px-4 pt-2">
                  <BaseFormCheckbox
                    name={`promotions.${index}.showOnHome`}
                    label="Trang chủ"
                    onChange={(checked) => onChangeShowHome(promotion, checked)}
                  />

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(promotion)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(promotion)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <PromotionCard promo={promotion} key={promotion.id} />
              </section>
            ))}
          </FormProvider>
        </section>
      </div>
    </main>
  );
};

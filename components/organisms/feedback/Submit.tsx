"use client";

import { BaseFormCheckbox } from "@/components/atoms/CheckboxForm";
import { BaseFormField } from "@/components/atoms/FieldForm";
import { BaseFormInput } from "@/components/atoms/FormInput";
import { BaseFormSelect } from "@/components/atoms/SelectForm";
import {
  CLUBS,
  DURATIONS,
  FAVORITES,
  Rating,
  RATING_LABELS,
  RATINGS,
} from "@/contants/feedback";
import { Star } from "lucide-react";
import { useState } from "react";
import { useWatch } from "react-hook-form";

export const SubmitForm = () => {
  const [hoverRating, setHoverRating] = useState<Rating>(5);
  const ratingField = useWatch({
    name: "rating",
  });
  console.log(
    "🚀 ~ file: Submit.tsx:30 ~ SubmitForm ~ ratingField:",
    ratingField,
  );
  return (
    <main>
      {/* THÔNG TIN HỘI VIÊN */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <BaseFormInput
            name="name"
            label="Họ và tên"
            isRequire
            placeholder="Nhập họ và tên"
          />
        </div>

        <div className="space-y-2">
          <BaseFormInput
            name="phone"
            label="Số điện thoại"
            isRequire
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="space-y-2">
          <BaseFormSelect name="club" options={CLUBS} />
        </div>

        <div className="space-y-2">
          <BaseFormSelect name="duration" options={DURATIONS} />
        </div>
      </div>

      {/* CẢM NHẬN */}
      <div className="space-y-6 mt-4">
        <div className="space-y-2">
          <BaseFormField name="rating" label="Bạn đánh giá Curves như thế nào?">
            {(field) => (
              <div className="flex items-center gap-1">
                {RATINGS.map((n) => {
                  const currentRating = Number(field.value) || 1;
                  const activeRating = hoverRating || currentRating;

                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => field.onChange(n)}
                      onMouseEnter={() => {
                        setHoverRating(n);
                        field.onChange(n);
                      }}
                      className="p-0.5"
                    >
                      <Star
                        className={`h-8 w-8 transition-transform hover:scale-110 ${
                          activeRating >= n
                            ? "fill-amber-400 text-amber-400"
                            : "fill-violet-100 text-purple-200"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </BaseFormField>

          <span className="min-w-20 text-sm font-bold text-purple-700">
            {ratingField || hoverRating
              ? RATING_LABELS[hoverRating]
              : "Chưa đánh giá"}
          </span>
        </div>

        <div className="space-y-2">
          <BaseFormSelect name="favourite" options={FAVORITES} />
        </div>

        <div className="space-y-2">
          <BaseFormInput
            type="textarea"
            name="story"
            label="Chia sẻ cảm nhận của bạn"
            isRequire
            placeholder="Hãy chia sẻ hành trình thay đổi của bạn tại Curves…"
          />
        </div>

        <div className="space-y-1"></div>
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-violet-50">
        <BaseFormCheckbox
          name="consent"
          className="mt-0.5"
          label="Tôi đồng ý để Curves sử dụng câu chuyện và hình ảnh của tôi trên
          website và các kênh truyền thông."
        />
      </div>
    </main>
  );
};

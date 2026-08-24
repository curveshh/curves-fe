"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Star, UploadCloud, Users, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { ErrorText } from "./ErrorText";
import { SectionTitle } from "./SectionTitle";

const CLUBS = [
  "Curves Quận 1",
  "Curves Quận 3",
  "Curves Phú Nhuận",
  "Curves Thảo Điền",
  "Curves Cầu Giấy",
  "Curves Tây Hồ",
];

const DURATIONS = ["Dưới 3 tháng", "3 – 6 tháng", "6 – 12 tháng", "Trên 1 năm"];

const FAVORITES = ["Phương pháp tập", "HLV", "Không gian", "Cộng đồng", "Khác"];

const RATING_LABELS = {
  1: "Rất tệ",
  2: "Chưa tốt",
  3: "Bình thường",
  4: "Hài lòng",
  5: "Xuất sắc",
};

const initialForm = {
  name: "",
  phone: "",
  club: "",
  duration: "",
  favorite: "",
  story: "",
  consent: false,
};

export default function FeedbackForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [images, setImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const update = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const handleFiles = (fileList) => {
    const files = Array.from(fileList).filter((f) =>
      f.type.startsWith("image/"),
    );
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), src: e.target.result, name: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) =>
    setImages((prev) => prev.filter((img) => img.id !== id));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Vui lòng nhập họ và tên";
    if (!/^[0-9+\s]{8,15}$/.test(form.phone.trim()))
      next.phone = "Vui lòng nhập số điện thoại hợp lệ";
    if (!form.club) next.club = "Vui lòng chọn câu lạc bộ";
    if (!form.story.trim()) next.story = "Vui lòng chia sẻ cảm nhận của bạn";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setRating(0);
    setImages([]);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-violet-50">
      {/* HERO NHỎ */}
      <section className="relative overflow-hidden bg-linear-to-br from-purple-950 via-purple-900 to-purple-700 px-6 pt-16 pb-24 text-white">
        <div className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-fuchsia-500 opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-amber-300">
            <Heart className="h-4 w-4 fill-amber-300" />
            Chia sẻ câu chuyện của bạn
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">Form cảm nhận</h1>
          <p className="mt-2 max-w-md text-violet-100">
            Mỗi câu chuyện là một nguồn cảm hứng cho cộng đồng Curves.
          </p>
        </div>
        <svg
          className="absolute inset-x-0 -bottom-1 block h-14 w-full text-violet-50"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C240,120 480,0 720,32 C960,64 1200,120 1440,56 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </section>

      {/* MAIN */}
      <main className="relative z-10 mx-auto -mt-14 max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* FORM CARD */}
          <Card className="rounded-3xl border-purple-100 shadow-xl lg:col-span-2">
            <CardContent className="p-8 md:p-10">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* THÔNG TIN HỘI VIÊN */}
                  <div>
                    <SectionTitle>Thông tin hội viên</SectionTitle>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Họ và tên <span className="text-purple-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="Nguyễn Thị A"
                          value={form.name}
                          onChange={(e) => update("name")(e.target.value)}
                          className={errors.name ? "border-red-400" : ""}
                        />
                        {errors.name && <ErrorText text={errors.name} />}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Số điện thoại{" "}
                          <span className="text-purple-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="09xx xxx xxx"
                          value={form.phone}
                          onChange={(e) => update("phone")(e.target.value)}
                          className={errors.phone ? "border-red-400" : ""}
                        />
                        {errors.phone && <ErrorText text={errors.phone} />}
                      </div>

                      <div className="space-y-2">
                        <Label>
                          Câu lạc bộ Curves đang tập{" "}
                          <span className="text-purple-500">*</span>
                        </Label>
                        <Select
                          value={form.club}
                          onValueChange={update("club")}
                        >
                          <SelectTrigger
                            className={errors.club ? "border-red-400" : ""}
                          >
                            <SelectValue placeholder="Chọn câu lạc bộ" />
                          </SelectTrigger>
                          <SelectContent>
                            {CLUBS.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.club && <ErrorText text={errors.club} />}
                      </div>

                      <div className="space-y-2">
                        <Label>
                          Thời gian đã tập tại Curves{" "}
                          <span className="text-xs font-normal text-slate-400">
                            Không bắt buộc
                          </span>
                        </Label>
                        <Select
                          value={form.duration}
                          onValueChange={update("duration")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn thời gian" />
                          </SelectTrigger>
                          <SelectContent>
                            {DURATIONS.map((d) => (
                              <SelectItem key={d} value={d}>
                                {d}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* CẢM NHẬN */}
                  <div>
                    <SectionTitle>Cảm nhận</SectionTitle>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Bạn đánh giá Curves như thế nào?</Label>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() => setRating(n)}
                                onMouseEnter={() => setHoverRating(n)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="p-0.5"
                              >
                                <Star
                                  className={`h-8 w-8 transition-transform hover:scale-110 ${
                                    (hoverRating || rating) >= n
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-violet-100 text-purple-200"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                          <span className="min-w-[80px] text-sm font-bold text-purple-700">
                            {rating ? RATING_LABELS[rating] : "Chưa đánh giá"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>
                          Điều bạn yêu thích nhất ở Curves?{" "}
                          <span className="text-xs font-normal text-slate-400">
                            Không bắt buộc
                          </span>
                        </Label>
                        <Select
                          value={form.favorite}
                          onValueChange={update("favorite")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn một lựa chọn" />
                          </SelectTrigger>
                          <SelectContent>
                            {FAVORITES.map((f) => (
                              <SelectItem key={f} value={f}>
                                {f}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="story">
                          Chia sẻ cảm nhận của bạn{" "}
                          <span className="text-purple-500">*</span>
                        </Label>
                        <Textarea
                          id="story"
                          rows={5}
                          placeholder="Hãy chia sẻ hành trình thay đổi của bạn tại Curves…"
                          value={form.story}
                          onChange={(e) => update("story")(e.target.value)}
                          className={errors.story ? "border-red-400" : ""}
                        />
                        {errors.story && <ErrorText text={errors.story} />}
                      </div>

                      <div className="space-y-2">
                        <Label>
                          Ảnh của bạn{" "}
                          <span className="text-xs font-normal text-slate-400">
                            Không bắt buộc
                          </span>
                        </Label>
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                          }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOver(false);
                            handleFiles(e.dataTransfer.files);
                          }}
                          className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
                            dragOver
                              ? "border-purple-500 bg-purple-50"
                              : "border-purple-200 bg-violet-50"
                          }`}
                        >
                          <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                            <UploadCloud className="h-5 w-5 text-purple-600" />
                          </div>
                          <p className="text-sm text-slate-600">
                            <span className="font-bold text-purple-700">
                              Kéo thả ảnh vào đây
                            </span>{" "}
                            hoặc bấm để chọn ảnh
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            PNG, JPG tối đa 10MB
                          </p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFiles(e.target.files)}
                          />
                        </div>

                        {images.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-3">
                            {images.map((img) => (
                              <div
                                key={img.id}
                                className="relative h-20 w-20 overflow-hidden rounded-xl shadow-md"
                              >
                                <Image
                                  src={img.src}
                                  alt={img.name}
                                  className="h-full w-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(img.id)}
                                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-950/75 text-white"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-violet-50 p-4">
                    <Checkbox
                      id="consent"
                      checked={form.consent}
                      onCheckedChange={update("consent")}
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor="consent"
                      className="text-sm font-normal leading-relaxed text-slate-600"
                    >
                      Tôi đồng ý để Curves sử dụng câu chuyện và hình ảnh của
                      tôi trên website và các kênh truyền thông.
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full bg-linear-to-br from-purple-700 to-purple-500 text-base font-bold shadow-lg shadow-purple-300 hover:from-purple-800 hover:to-purple-600"
                  >
                    Gửi cảm nhận
                  </Button>
                </form>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-purple-700 to-purple-500 shadow-lg shadow-purple-300">
                    <Heart className="h-9 w-9 fill-white text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-purple-950">
                    Cảm ơn bạn đã chia sẻ!
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                    Câu chuyện của bạn có thể truyền cảm hứng đến rất nhiều phụ
                    nữ khác trên hành trình khỏe đẹp cùng Curves.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-3 text-sm font-bold">
                    <button
                      onClick={resetForm}
                      className="text-purple-700 hover:underline"
                    >
                      Quay về trang chủ
                    </button>
                    <span className="text-purple-200">|</span>
                    <button className="text-purple-700 hover:underline">
                      Xem câu chuyện thành công
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SIDE VISUAL */}
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <Card className="relative overflow-hidden rounded-3xl border-none bg-linear-to-br from-purple-700 to-purple-950 shadow-xl">
              <CardContent className="relative flex aspect-[4/4.6] items-end p-0">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 480 552"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <circle
                    cx="400"
                    cy="80"
                    r="120"
                    fill="#7A3DAE"
                    opacity="0.3"
                  />
                  <circle
                    cx="50"
                    cy="480"
                    r="110"
                    fill="#C9A6E8"
                    opacity="0.22"
                  />
                  <ellipse cx="240" cy="200" rx="52" ry="52" fill="#E9CE9A" />
                  <path
                    d="M180 262 q60 -30 120 0 q18 130 -8 260 h-104 q-26 -130 -8 -260 Z"
                    fill="#F4E9FF"
                  />
                </svg>

                <div className="relative z-10 m-5 w-[calc(100%-2.5rem)] rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur">
                  <span className="mb-1 block font-serif text-3xl leading-none text-amber-400">
                    {`"`}
                  </span>
                  <p className="text-sm italic leading-relaxed text-purple-950">
                    Curves không chỉ giúp tôi khỏe hơn, mà còn khiến tôi yêu cơ
                    thể và bản thân mình hơn mỗi ngày.
                  </p>
                  <p className="mt-2 text-xs font-bold text-purple-700">
                    — Thành viên Curves
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-purple-100 shadow-md">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-amber-400 to-amber-300">
                  <Users className="h-5 w-5 text-purple-900" />
                </div>
                <p className="text-sm font-bold leading-snug text-purple-950">
                  Hàng nghìn phụ nữ đã chia sẻ hành trình cùng Curves
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

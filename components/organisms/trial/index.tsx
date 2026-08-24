"use client";

import { VenusIcon } from "@/components/icons";
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
import {
  ArrowRight,
  Clock,
  Gift,
  HeartHandshake,
  Lock,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const CLUBS = [
  "Curves Quận 1",
  "Curves Quận 3",
  "Curves Phú Nhuận",
  "Curves Thảo Điền",
  "Curves Cầu Giấy",
  "Curves Tây Hồ",
];

const TIME_SLOTS = [
  "Sáng (6:00 – 10:00)",
  "Trưa (10:00 – 13:00)",
  "Chiều (13:00 – 17:00)",
  "Tối (17:00 – 20:30)",
];

const GOALS = [
  "Giảm cân, giảm mỡ",
  "Tăng sức bền, dẻo dai",
  "Săn chắc cơ thể",
  "Cải thiện sức khỏe tổng thể",
  "Giảm căng thẳng, thư giãn",
];

const TRUST_POINTS = [
  { icon: Clock, label: "30 phút / buổi" },
  { icon: HeartHandshake, label: "HLV hướng dẫn tận tình" },
  { icon: VenusIcon, label: "Dành riêng cho phụ nữ" },
  { icon: Lock, label: "Không gian riêng tư" },
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  club: "",
  date: "",
  time: "",
  goal: "",
  consent: false,
};

export default function TrialSignup() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Vui lòng nhập họ và tên";
    if (!/^[0-9+\s]{8,15}$/.test(form.phone.trim()))
      next.phone = "Vui lòng nhập số điện thoại hợp lệ";
    if (!form.club) next.club = "Vui lòng chọn câu lạc bộ";
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
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-violet-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-purple-700 px-6 pt-20 pb-28 text-white">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-fuchsia-500 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-10 h-64 w-64 rounded-full bg-purple-400 opacity-20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
            <Sparkles className="h-4 w-4" />
            Curves Fitness
          </div>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            Đăng ký tập thử{" "}
            <span className="italic text-amber-300">miễn phí</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg font-light text-violet-100">
            Trải nghiệm 1 buổi tập cùng huấn luyện viên Curves — không mất phí,
            không ràng buộc, chỉ mất 30 giây để đăng ký.
          </p>
        </div>

        {/* curved divider */}
        <svg
          className="absolute inset-x-0 -bottom-1 block h-16 w-full text-violet-50"
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
      <main className="relative z-10 mx-auto -mt-16 max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* FORM CARD */}
          <Card className="rounded-3xl border-purple-100 shadow-xl lg:col-span-2">
            <CardContent className="p-8 md:p-10">
              {!submitted ? (
                <>
                  <h2 className="text-2xl font-semibold text-purple-950">
                    Thông tin đăng ký
                  </h2>
                  <p className="mt-1 mb-8 text-sm text-slate-500">
                    Điền thông tin bên dưới, đội ngũ Curves sẽ liên hệ xác nhận
                    lịch tập trong 24 giờ.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="name">
                          Họ và tên <span className="text-purple-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="Nguyễn Thị A"
                          value={form.name}
                          onChange={(e) => update("name")(e.target.value)}
                          className={
                            errors.name
                              ? "border-red-400 focus-visible:ring-red-300"
                              : ""
                          }
                        />
                        {errors.name && (
                          <p className="text-xs font-medium text-red-500">
                            {errors.name}
                          </p>
                        )}
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
                          className={
                            errors.phone
                              ? "border-red-400 focus-visible:ring-red-300"
                              : ""
                          }
                        />
                        {errors.phone && (
                          <p className="text-xs font-medium text-red-500">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email{" "}
                          <span className="text-xs font-normal text-slate-400">
                            Không bắt buộc
                          </span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="ban@email.com"
                          value={form.email}
                          onChange={(e) => update("email")(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>
                          Khu vực / Câu lạc bộ muốn tập{" "}
                          <span className="text-purple-500">*</span>
                        </Label>
                        <Select
                          value={form.club}
                          onValueChange={update("club")}
                        >
                          <SelectTrigger
                            className={
                              errors.club
                                ? "border-red-400 focus:ring-red-300"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Chọn câu lạc bộ gần bạn" />
                          </SelectTrigger>
                          <SelectContent>
                            {CLUBS.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.club && (
                          <p className="text-xs font-medium text-red-500">
                            {errors.club}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date">
                          Ngày mong muốn đến tập{" "}
                          <span className="text-xs font-normal text-slate-400">
                            Không bắt buộc
                          </span>
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={form.date}
                          onChange={(e) => update("date")(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>
                          Khung giờ{" "}
                          <span className="text-xs font-normal text-slate-400">
                            Không bắt buộc
                          </span>
                        </Label>
                        <Select
                          value={form.time}
                          onValueChange={update("time")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn khung giờ" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_SLOTS.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>
                          Mục tiêu tập luyện{" "}
                          <span className="text-xs font-normal text-slate-400">
                            Không bắt buộc
                          </span>
                        </Label>
                        <Select
                          value={form.goal}
                          onValueChange={update("goal")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn mục tiêu chính của bạn" />
                          </SelectTrigger>
                          <SelectContent>
                            {GOALS.map((g) => (
                              <SelectItem key={g} value={g}>
                                {g}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        Tôi đồng ý để Curves liên hệ tư vấn về lịch tập thử và
                        các chương trình tập luyện phù hợp.
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-full bg-gradient-to-r from-purple-700 to-purple-500 text-base font-bold shadow-lg shadow-purple-300 hover:from-purple-800 hover:to-purple-600"
                    >
                      Đăng ký tập thử
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                    <p className="text-center text-xs text-slate-400">
                      Miễn phí 100% · Không cần thẻ thanh toán · Huỷ lịch bất kỳ
                      lúc nào
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-700 to-purple-500 shadow-lg shadow-purple-300">
                    <PartyPopper className="h-9 w-9 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-purple-950">
                    Đăng ký thành công!
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                    Cảm ơn bạn đã đăng ký. Curves sẽ liên hệ trong 24 giờ để xác
                    nhận lịch tập thử của bạn.
                  </p>

                  <div className="mx-auto mt-6 max-w-sm space-y-2 rounded-xl bg-violet-50 p-4 text-left text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Họ và tên</span>
                      <span className="font-semibold text-purple-950">
                        {form.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Số điện thoại</span>
                      <span className="font-semibold text-purple-950">
                        {form.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Câu lạc bộ</span>
                      <span className="font-semibold text-purple-950">
                        {form.club}
                      </span>
                    </div>
                    {form.time && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Khung giờ</span>
                        <span className="font-semibold text-purple-950">
                          {form.time}
                        </span>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    className="mt-6 rounded-full border-purple-200 text-purple-700 hover:bg-violet-50"
                    onClick={resetForm}
                  >
                    Đăng ký buổi khác
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SIDE COLUMN */}
          <div className="space-y-6">
            <Card className="relative overflow-hidden rounded-3xl border-none bg-gradient-to-br from-purple-700 to-purple-950 shadow-xl">
              <CardContent className="relative flex aspect-square items-end p-0">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 480 480"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <circle
                    cx="380"
                    cy="420"
                    r="140"
                    fill="#7A3DAE"
                    opacity="0.35"
                  />
                  <circle
                    cx="40"
                    cy="50"
                    r="90"
                    fill="#C9A6E8"
                    opacity="0.25"
                  />
                  <g opacity="0.96">
                    <ellipse cx="150" cy="200" rx="30" ry="30" fill="#E9CE9A" />
                    <path
                      d="M122 236 q28 -17 56 0 q9 62 -4 132 h-48 q-13 -70 -4 -132 Z"
                      fill="#F4E9FF"
                    />
                  </g>
                  <g opacity="0.9">
                    <ellipse cx="280" cy="170" rx="27" ry="27" fill="#E9CE9A" />
                    <path
                      d="M256 202 q24 -15 48 0 q8 54 -4 118 h-40 q-12 -64 -4 -118 Z"
                      fill="#E7CFF9"
                    />
                  </g>
                  <g>
                    <ellipse cx="205" cy="290" rx="29" ry="29" fill="#F3D9A8" />
                    <path
                      d="M179 324 q26 -16 52 0 q9 60 -4 128 h-44 q-13 -68 -4 -128 Z"
                      fill="#FFFFFF"
                    />
                  </g>
                </svg>

                <div className="relative z-10 m-5 flex w-[calc(100%-2.5rem)] items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-300">
                    <Gift className="h-5 w-5 text-purple-900" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-snug text-purple-950">
                      Buổi tập đầu tiên hoàn toàn miễn phí
                    </p>
                    <p className="text-xs text-slate-500">
                      Không phát sinh chi phí ẩn
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-purple-100 shadow-md">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-purple-950">
                  Vì sao chọn Curves?
                </h3>
                <ul className="space-y-3">
                  {TRUST_POINTS.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex items-center gap-3 text-sm font-semibold text-purple-950"
                    >
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-50 text-purple-700">
                        <Icon className="h-4 w-4" />
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

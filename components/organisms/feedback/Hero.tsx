import { Heart } from "lucide-react";
import { memo } from "react";

export const HeroSection = memo(() => {
  return (
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
  );
});

HeroSection.displayName = "HeroSection";

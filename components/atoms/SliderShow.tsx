"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Banner } from "@/types/banner";

export interface BannerSlide {
  image: string;
  header?: string;
  primaryText?: string;
  description?: string;
  buttonText?: string;
}

interface PreviewBannerProps {
  slides: Banner[];
  autoPlay?: boolean;
  interval?: number;
}

export function SliderShow({
  slides,
  autoPlay = true,
  interval = 5000,
}: PreviewBannerProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = slides.length;

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  const goTo = useCallback((nextIndex: number) => {
    setIndex(nextIndex);
  }, []);

  useEffect(() => {
    if (!autoPlay || isPaused || total <= 1) {
      return;
    }

    const timer = window.setInterval(goNext, interval);

    return () => {
      window.clearInterval(timer);
    };
  }, [autoPlay, interval, isPaused, total, goNext]);

  if (!slides.length) {
    return null;
  }

  return (
    <Card
      className="overflow-hidden border-purple-100 shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative aspect-16/5 w-full min-h-80 overflow-hidden">
        {slides.map((slide, i) => {
          const isActive = i === index;

          return (
            <div
              key={i}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0",
                "transition-[opacity,transform]",
                "duration-500 ease-out",
                isActive
                  ? "z-1 scale-100 opacity-100"
                  : "pointer-events-none z-0 scale-[1.015] opacity-0",
              )}
            >
              {/* Banner image */}
              {slide.imageUrl && (
                <Image
                  src={slide.imageUrl}
                  alt={slide.primaryText || "Banner"}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/35" />

              {/* Content */}
              <div className="relative z-10 flex aspect-16/5 w-full min-h-80 items-center">
                <div className="max-w-lg px-10 py-12 sm:px-14">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-200">
                    {slide.header || "Tiêu đề banner"}
                  </p>

                  <h2 className="mb-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                    {slide.primaryText || "Nội dung chính"}
                  </h2>

                  <p className="mb-6 text-sm leading-relaxed text-white/80">
                    {slide.description || "Mô tả ngắn cho banner này..."}
                  </p>

                  <Button className="rounded-full bg-pink-500 px-6 font-semibold hover:bg-pink-600">
                    {slide.buttonText || "Xem thêm"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Previous */}
        {total > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Banner trước"
            className="
              absolute left-4 top-1/2 z-20
              flex size-9 -translate-y-1/2
              items-center justify-center
              rounded-full
              bg-white/20
              text-white
              backdrop-blur
              transition
              hover:bg-white/30
            "
          >
            <ChevronLeft className="size-5" />
          </button>
        )}

        {/* Next */}
        {total > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Banner tiếp theo"
            className="
              absolute right-4 top-1/2 z-20
              flex size-9 -translate-y-1/2
              items-center justify-center
              rounded-full
              bg-white/20
              text-white
              backdrop-blur
              transition
              hover:bg-white/30
            "
          >
            <ChevronRight className="size-5" />
          </button>
        )}

        {/* Dots */}
        {total > 1 && (
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Chuyển đến banner ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "w-6 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

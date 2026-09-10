"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSwiper } from "swiper/react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface SwiperNavigationProps {
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
}

export function SwiperNavigation({
  className,
  buttonClassName,
  disabled = false,
}: SwiperNavigationProps) {
  const swiper = useSwiper();

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-2",
        className,
      )}
    >
      <Button
        type="button"
        aria-label="Previous slide"
        disabled={disabled}
        onClick={() => swiper.slidePrev()}
        className={cn(
          "pointer-events-auto flex size-10 items-center justify-center rounded-full bg-purple-400 shadow-md transition hover:opacity-80 disabled:pointer-events-none disabled:opacity-40",
          buttonClassName,
        )}
      >
        <ArrowLeft className="size-5" />
      </Button>

      <Button
        type="button"
        aria-label="Next slide"
        disabled={disabled}
        onClick={() => swiper.slideNext()}
        className={cn(
          "pointer-events-auto flex size-10 items-center justify-center rounded-full bg-purple-400 shadow-md transition hover:opacity-80 disabled:pointer-events-none disabled:opacity-40",
          buttonClassName,
        )}
      >
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}

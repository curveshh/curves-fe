"use client";

import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface SwiperPaginationProps {
  className?: string;
  bulletClassName?: string;
  activeBulletClassName?: string;
}

export function SwiperPagination({
  className,
  bulletClassName,
  activeBulletClassName,
}: SwiperPaginationProps) {
  const swiper = useSwiper();

  const [activeIndex, setActiveIndex] = useState(swiper.realIndex ?? 0);

  const [total, setTotal] = useState(swiper.slides?.length ?? 0);

  useEffect(() => {
    const update = () => {
      setActiveIndex(swiper.realIndex);
      setTotal(swiper.slides?.length ?? 0);
    };

    update();

    swiper.on("slideChange", update);
    swiper.on("update", update);
    swiper.on("resize", update);

    return () => {
      swiper.off("slideChange", update);
      swiper.off("update", update);
      swiper.off("resize", update);
    };
  }, [swiper]);

  if (total <= 1) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5",
        className,
      )}
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <Button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive ? "true" : undefined}
            onClick={() => swiper.slideToLoop(index)}
            className={cn(
              "h-2 w-2 rounded-full bg-white/50 transition-all duration-300",
              bulletClassName,
              isActive && cn("w-6 bg-purple-400", activeBulletClassName),
            )}
          />
        );
      })}
    </div>
  );
}

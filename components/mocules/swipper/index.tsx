"use client";

import { Children, ReactNode } from "react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

import "swiper/css";
import { SwiperNavigation } from "./navigation";
import { SwiperPagination } from "./pagination";

interface BaseSwiperProps extends Omit<SwiperProps, "children"> {
  children: ReactNode;

  navigation?: boolean;
  pagination?: boolean;
  autoplay?: boolean;

  navigationClassName?: string;
  navigationButtonClassName?: string;

  paginationClassName?: string;
  paginationBulletClassName?: string;
  paginationActiveBulletClassName?: string;
}

export function BaseSwiper({
  children,
  navigation = false,
  pagination = false,
  autoplay = false,

  navigationClassName,
  navigationButtonClassName,

  paginationClassName,
  paginationBulletClassName,
  paginationActiveBulletClassName,

  modules = [],
  ...props
}: BaseSwiperProps) {
  const swiperModules = [
    A11y,
    Keyboard,
    ...(autoplay ? [Autoplay] : []),
    ...modules,
  ];
  const slides = Children.toArray(children);

  return (
    <div className="relative w-full">
      <Swiper
        {...props}
        modules={swiperModules}
        className="w-full"
        navigation={false}
        pagination={
          pagination
            ? {
                clickable: true,
                el: ".base-swiper-pagination",
              }
            : false
        }
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
        {navigation && (
          <SwiperNavigation
            className={navigationClassName}
            buttonClassName={navigationButtonClassName}
          />
        )}
        {pagination && (
          <SwiperPagination
            className={paginationClassName}
            bulletClassName={paginationBulletClassName}
            activeBulletClassName={paginationActiveBulletClassName}
          />
        )}
      </Swiper>
    </div>
  );
}

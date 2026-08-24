"use client";

import { Banner } from "@/types/banner";
import { SliderShow } from "../atoms/SliderShow";

const GRADIENTS = [
  "from-purple-900 via-purple-700 to-fuchsia-500",
  "from-fuchsia-700 via-purple-800 to-purple-950",
  "from-pink-500 via-fuchsia-600 to-purple-800",
];

const INITIAL_SLIDES = [
  {
    image: "/images/banner1.jpg",
    header: "Ưu đãi tháng 8",
    primaryText: "Tập luyện không giới hạn",
    description: "Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt.",
    buttonText: "Xem ưu đãi",
  },
  {
    image: "/images/banner2.jpg",
    header: "Curves Fitness",
    primaryText: "Khỏe hơn mỗi ngày",
    description: "Cùng Curves xây dựng lối sống khỏe mạnh.",
    buttonText: "Khám phá",
  },
];

function emptySlide() {
  return {
    id: Date.now(),
    gradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
    header: "Tiêu đề banner",
    primaryText: "Nội dung chính",
    description: "Mô tả ngắn cho banner này...",
    buttonText: "Xem thêm",
    buttonLink: "https://curves.vn/",
    active: true,
  };
}

type Props = {
  banners: Banner[];
};

export const BannerHome = ({ banners }: Props) => {
  return <SliderShow slides={banners} autoPlay interval={5000} />;
};

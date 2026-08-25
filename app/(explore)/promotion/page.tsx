import { PromotionComponent } from "@/components/organisms/promotion";
import { createPageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Câu lạc bộ Curves",
  description:
    "Tìm câu lạc bộ Curves gần bạn và bắt đầu hành trình tập luyện 30 phút cùng đội ngũ hỗ trợ tận tâm.",
  path: "/promotion",
  keywords: ["câu lạc bộ Curves", "phòng tập nữ", "Curves gần tôi"],
});

export default function PromotionPage() {
  return <PromotionComponent />;
}

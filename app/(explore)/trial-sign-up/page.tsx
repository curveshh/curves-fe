import TrialSignup from "@/components/organisms/trial";
import { createPageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Bảng giá và gói tập",
  description:
    "Khám phá gói tập Curves linh hoạt và nhận tư vấn để chọn lộ trình phù hợp với mục tiêu sức khỏe của bạn.",
  path: "/trial-sign-up",
  keywords: ["bảng giá Curves", "gói tập Curves", "hội viên Curves"],
});

export default function TrialSignUpPage() {
  return <TrialSignup />;
}

import { createPageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Về Curves",
  description:
    "Tìm hiểu về Curves Vietnam, nơi phụ nữ xây dựng sức khỏe, sự tự tin và thói quen vận động bền vững.",
  path: "/about",
  keywords: ["về Curves", "Curves Vietnam", "cộng đồng phụ nữ"],
});

export default function AboutPage() {
  return <div>About Us</div>;
}

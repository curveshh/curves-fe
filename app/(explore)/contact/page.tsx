import { createPageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Liên hệ Curves",
  description:
    "Liên hệ Curves Vietnam để được tư vấn chương trình tập luyện, gói hội viên và câu lạc bộ phù hợp.",
  path: "/contact",
  keywords: ["liên hệ Curves", "tư vấn tập thử", "Curves Vietnam"],
});

export default function ContactPage() {
  return <div>Contact</div>;
}

import CurvesNewsPage from "@/components/organisms/News";
import { getNewsList } from "@/lib/api/news";
import { createPageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = createPageMetadata({
  title: "Tin tức và kiến thức tập luyện",
  description:
    "Cập nhật kiến thức tập luyện, dinh dưỡng và cảm hứng sống khỏe mỗi ngày từ Curves Vietnam.",
  path: "/news",
  keywords: ["tin tức Curves", "kiến thức tập luyện", "dinh dưỡng cho phụ nữ"],
});

export default async function NewsPage() {
  const { data } = await getNewsList({});

  if (!data) notFound();

  return <CurvesNewsPage data={data} />;
}

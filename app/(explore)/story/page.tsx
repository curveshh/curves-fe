import CurvesSuccessStories from "@/components/organisms/story";
import { getNewsList } from "@/lib/api/news";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Chương trình tập luyện 30 phút",
  description:
    "Khám phá chương trình Curves Circuit kết hợp cardio, kháng lực và giãn cơ, giúp bạn tập toàn thân chỉ trong 30 phút.",
  path: "/story",
  keywords: ["Curves Circuit", "tập toàn thân", "cardio", "tập kháng lực"],
});

export default async function StoryPage() {
  const { data } = await getNewsList({
    category: "story",
  });

  return <CurvesSuccessStories data={data} />;
}

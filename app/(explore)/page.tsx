import { HomeComponent } from "@/components/organisms/Home";
import { getBannerList } from "@/lib/api/banner";
import { getNewsList } from "@/lib/api/news";
import { getPromotionHome } from "@/lib/api/promotion";
import { createPageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Tập luyện 30 phút dành cho phụ nữ",
  description:
    "Khám phá Curves Vietnam: chương trình tập luyện toàn thân 30 phút, cộng đồng tích cực và đội ngũ hỗ trợ tận tâm dành cho phụ nữ.",
  path: "/",
  keywords: ["Curves", "tập 30 phút", "gym nữ", "fitness cho phụ nữ"],
});

export default async function ExplorePage() {
  const [bannerResponse, newsResponse, promotionResponse] = await Promise.all([
    getBannerList(),
    getNewsList({
      isHome: true,
    }),
    getPromotionHome(),
  ]);

  return (
    <HomeComponent
      banners={bannerResponse.data}
      news={newsResponse.data}
      promotion={promotionResponse.data}
    />
  );
}

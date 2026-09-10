import { Promotion } from "@/schemas/promotion";
import { Banner } from "@/types/banner";
import { NewsPostFormValues } from "@/types/news";
import { PromotionCard } from "../atoms/PromotionCard";
import { BannerHome } from "../mocules/BannerHome";
import { Review } from "../mocules/Review";
import { TrainingPrograms } from "../mocules/TrainingPrograms";
import CurvesCircuitSection from "./Circuit";

type Props = {
  banners: Banner[];
  news: NewsPostFormValues[];
  promotion: Promotion;
};

export const HomeComponent = ({
  banners = [],
  news = [],
  promotion,
}: Props) => {
  return (
    <main>
      <BannerHome banners={banners} />
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <section
          className={`"col-span-4  order-2 lg:order-1" ${promotion ? "lg:col-span-3" : "lg:col-span-4"}`}
        >
          <TrainingPrograms news={news} />
        </section>
        {promotion && (
          <section className="col-span-4 lg:col-span-1 order-1 lg:order-2">
            <PromotionCard promo={promotion} />
          </section>
        )}
      </section>
      <section className="section workout" id="workout">
        <CurvesCircuitSection />
      </section>
      <Review />
    </main>
  );
};

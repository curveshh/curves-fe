import { PromotionForm } from "@/components/organisms/promotion/promotionForm";
import { getPromotionDetails } from "@/lib/api/promotion";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export default async function PromotionEditPage({ params }: Props) {
  const { id } = await params;
  const { data } = await getPromotionDetails(id);

  if (!data) {
    return notFound();
  }

  return <PromotionForm initialValues={data} />;
}

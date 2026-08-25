import BannerForm from "@/components/organisms/dashboard/banner/BannerForm";
import { API } from "@/contants/api";
import { baseURL } from "@/lib/api/axios";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditBannerPage({ params }: Props) {
  const { id } = await params;
  let data;
  try {
    const response = await fetch(`${baseURL}${API.BANNER}/details/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) notFound();
    ({ data } = await response.json());
  } catch {
    notFound();
  }

  if (!data) notFound();

  return <BannerForm data={data} />;
}

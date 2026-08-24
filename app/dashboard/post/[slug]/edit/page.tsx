import DashboardPostCmp from "@/components/organisms/dashboard/post/PostForm";
import { API } from "@/contants/api";
import { baseURL } from "@/lib/api/axios";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostEditPage({ params }: Props) {
  const { slug } = await params;
  let data;
  try {
    const response = await fetch(
      `${baseURL}${API.DETAIL_NEWS_BY_SLUG.replace(":slug", slug)}`,
      {
        cache: "no-store",
        method: "GET",
      },
    );
    if (!response.ok) notFound();
    ({ data } = await response.json());
  } catch {
    notFound();
  }

  if (!data) notFound();

  return <DashboardPostCmp data={data} />;
}

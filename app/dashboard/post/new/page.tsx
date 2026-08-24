import DashboardPostCmp from "@/components/organisms/dashboard/post/PostForm";
import { API } from "@/contants/api";
import { baseURL } from "@/lib/api/axios";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostNewPage({ params }: Props) {
  return <DashboardPostCmp />;
}

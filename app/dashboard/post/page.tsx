import { PostList } from "@/components/organisms/dashboard/post/PostList";
import { getNewsList } from "@/lib/api/news";

export default async function PostPage() {
  const { data } = await getNewsList({});

  return <PostList data={data} />;
}

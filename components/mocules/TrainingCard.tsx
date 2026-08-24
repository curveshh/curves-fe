import { ROUTE } from "@/contants/route";
import { NewsPostFormValues } from "@/types/news";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui";

type Props = {
  newsItem: NewsPostFormValues;
};

export const TrainingCard = ({
  newsItem: { coverImageUrl, title, content, slug },
}: Props) => {
  const router = useRouter();

  const navigateToNewsDetail = () => {
    router.push(ROUTE.NEWS_DETAILS.replace(":slug", slug));
  };

  return (
    <Card className="group overflow-hidden rounded-lg border-gray-200 bg-white py-0 shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[1.72/1] overflow-hidden">
        {coverImageUrl && (
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>

      {/* Content */}
      <CardContent className="px-3 py-2.5">
        <h3 className="text-[12px] font-bold text-gray-900 md:text-[13px]">
          {title}
        </h3>

        <p className="mt-1 line-clamp-2 min-h-7.5 text-[10px] leading-3.75 text-gray-500 md:text-[11px]">
          {content}
        </p>

        <Link
          href={`${ROUTE.NEWS_DETAILS.replace(":slug", slug)}`}
          className="mt-1 h-auto gap-1 p-0 text-[10px] font-medium text-purple-600 hover:text-purple-700 flex justify-end items-center py-2"
        >
          Tìm hiểu thêm
          <ArrowRight className="size-3" />
        </Link>
      </CardContent>
    </Card>
  );
};

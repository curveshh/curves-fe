"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { ROUTE } from "@/contants/route";
import { storyCategoryOptions } from "@/contants/story";
import { NewsPostFormValues } from "@/types/news";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Story {
  category: string;
  badgeClass: string;
  title: string;
  description: string;
  name: string;
  image: string;
  featured?: boolean;
}

const stories: Story[] = [
  {
    category: "GIẢM CÂN",
    badgeClass: "bg-fuchsia-50 text-fuchsia-600",
    title: "Giảm 12kg – Tự tin hơn mỗi ngày!",
    description:
      "Sau 6 tháng tập luyện tại Curves, chị Lan đã giảm 12kg, cơ thể săn chắc hơn và tràn đầy năng lượng.",
    name: "Chị Lan, 45 tuổi – Hà Nội",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    category: "SỨC KHỎE",
    badgeClass: "bg-emerald-50 text-emerald-600",
    title: "Hết đau lưng, hết mệt mỏi sau 3 tháng",
    description:
      "Công việc văn phòng khiến chị đau lưng nhiều năm. Giờ đây, chị Hương ngồi ngoan hơn và khỏe mạnh hơn mỗi ngày.",
    name: "Chị Hương, 52 tuổi – Đà Nẵng",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "SỨC MẠNH",
    badgeClass: "bg-orange-50 text-orange-600",
    title: "Cơ thể khỏe mạnh, tinh thần tích cực",
    description:
      "Tập luyện 30 phút, 3 lần/tuần tại Curves giúp chị Mai khỏe mạnh hơn, tự tin hơn và yêu đời hơn.",
    name: "Chị Mai, 48 tuổi – TP. HCM",
    image:
      "https://images.unsplash.com/photo-1571019613531-8ecb61a5c1e6?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "XƯƠNG KHỚP",
    badgeClass: "bg-purple-50 text-purple-600",
    title: "Loãng xương cải thiện rõ rệt",
    description:
      "Sau 1 năm tập luyện, mật độ xương cải thiện, vận động dễ dàng hơn và không còn đau nhức.",
    name: "Cô Tú, 60 tuổi – Hải Phòng",
    image:
      "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "GIẢM CÂN",
    badgeClass: "bg-fuchsia-50 text-fuchsia-600",
    title: "Giảm 8kg và giữ dáng bền vững",
    description:
      "Chế độ luyện tập khoa học tại Curves giúp chị Phượng giảm cân an toàn và duy trì vóc dáng lâu dài.",
    name: "Chị Phượng, 41 tuổi – Cần Thơ",
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "TINH THẦN",
    badgeClass: "bg-rose-50 text-rose-600",
    title: "Kết nối bạn bè, cuộc sống vui hơn",
    description:
      "Curves không chỉ giúp tôi khỏe mạnh hơn mà còn có thêm nhiều người bạn tuyệt vời.",
    name: "Chị Ngân, 55 tuổi – Bình Dương",
    image:
      "https://images.unsplash.com/photo-1573384999396-a13cbb417f92?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
];

function StoryCard({ story }: { story: NewsPostFormValues }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white">
      <div className="relative h-56 bg-gray-200">
        {/* {story.featured && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-fuchsia-600/80 to-purple-800/80">
            <span
              className="text-3xl text-white/90"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              Curves
            </span>
          </div>
        )} */}
        {story.coverImageUrl && (
          <Image
            src={story.coverImageUrl}
            alt={story.title}
            className="h-full w-full object-cover"
            fill
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {/* <Badge
          variant="secondary"
          className={`w-fit rounded-full border-none font-semibold ${story.badgeClass}`}
        >
          {story.category}
        </Badge>*/}
        <h3 className="text-lg font-bold text-purple-950">{story.title}</h3>
        <p className="mt-1 text-xs text-gray-400">
          {dayjs(story.publishedAt).format("DD/MM/YYYY")}
        </p>
        <p className="mt-1 flex-1 text-sm text-gray-500">{story.content}</p>
        <Link
          href={ROUTE.STORY_DETAILS.replace(":slug", story.slug)}
          className="mt-2 inline-flex items-center justify-end gap-1 text-xs font-semibold text-purple-900 hover:underline"
        >
          Xem chi tiết <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

type Props = {
  data: NewsPostFormValues[];
};

export default function CurvesSuccessStories({ data = [] }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const badge = searchParams.get("badge") ?? "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("badge");
    } else {
      params.set("badge", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  console.log("data:", data);
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* STORIES */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-extrabold tracking-wide text-purple-950 md:text-2xl">
            CÂU CHUYỆN MỚI NHẤT
          </h2>
          <Select value={badge} onValueChange={handleChange}>
            <SelectTrigger className="w-fit rounded-full border-gray-300 text-sm text-gray-600">
              <SelectValue placeholder="Tất cả câu chuyện" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {storyCategoryOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  className="cursor-pointer hover:bg-slate-200"
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((story, i) => (
            <StoryCard key={i} story={story} />
          ))}
        </div>
      </section>
    </div>
  );
}

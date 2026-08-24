import { Badge, Button, Card, CardContent, Input } from "@/components/ui";
import { ROUTE } from "@/contants/route";
import { NewsPostFormValues } from "@/types/news";
import { ArrowRight, CalendarDays, Clock, Search } from "lucide-react";
import Link from "next/link";

type PropsArticle = {
  article: NewsPostFormValues;
};

function ArticleCard({ article }: PropsArticle) {
  return (
    <Card
      className={`group overflow-hidden border-purple-100 py-0 gap-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/10 flex flex-col`}
    >
      <div className={`relative bg-linear-to-br aspect-video`}>
        <Badge className="absolute left-4 top-4 bg-white/95 text-purple-700 hover:bg-white font-semibold">
          Nổi bật
        </Badge>
      </div>
      <CardContent className={`flex flex-1 flex-col p-5 `}>
        <div className="mb-2.5 flex items-center gap-3 text-xs text-purple-400">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {article.publishedAt}
          </span>
          <>
            <span className="h-1 w-1 rounded-full bg-purple-200" />
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
            </span>
          </>
        </div>
        <h3 className={`font-bold leading-snug text-purple-950 text-base mb-2`}>
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mb-4 text-sm leading-relaxed text-purple-400">
            {article.excerpt}
          </p>
        )}
        <Link
          href={`${ROUTE.NEWS_DETAILS.replace(":slug", article.slug)}`}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 transition-transform"
        >
          Đọc thêm
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}

type Props = {
  data: NewsPostFormValues[];
};

export default function CurvesNewsPage0({ data }: Props) {
  return (
    <div className="min-h-screen bg-purple-50/40 font-sans text-purple-950">
      {/* Hero */}
      <section className="relative mx-4 mt-6 overflow-hidden rounded-3xl bg-linear-to-br from-purple-950 via-purple-700 to-fuchsia-500 sm:mx-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute bottom-22.5 right-32 h-56 w-56 rounded-full bg-white/5" />
        <div className="relative z-10 max-w-xl px-8 py-14 sm:px-16 sm:py-16">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.2em] text-pink-200">
            Góc chia sẻ Curves
          </p>
          <h1 className="mb-3.5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Tin tức
          </h1>
          <p className="mb-7 max-w-md text-[15px] leading-relaxed text-white/80">
            Cập nhật kiến thức tập luyện, bí quyết dinh dưỡng và nguồn cảm hứng
            sống khoẻ mỗi ngày dành riêng cho phụ nữ.
          </p>
          <div className="flex max-w-md items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-lg shadow-purple-950/25">
            <Search className="h-4 w-4 shrink-0 text-purple-300" />
            <Input
              placeholder="Tìm kiếm bài viết..."
              className="border-0 shadow-none focus-visible:ring-0 px-2"
            />
            <Button
              size="sm"
              className="shrink-0 rounded-full bg-pink-500 hover:bg-pink-600"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Article list — single unified list, no sub-categories */}
      <section className="px-6 py-14 sm:px-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="mb-1.5 text-2xl font-extrabold text-purple-950">
              Bài viết mới nhất
            </h2>
            <p className="text-sm text-purple-400">
              Tất cả bài viết được cập nhật liên tục, không phân chia chuyên mục
            </p>
          </div>
          <div className="rounded-full border border-purple-100 bg-white px-4 py-2 text-sm text-purple-400">
            <span className="font-bold text-purple-700">{data.length}</span> bài
            viết
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            className="rounded-full border-purple-700 px-9 font-semibold text-purple-700 hover:bg-purple-50 hover:text-purple-800"
          >
            Xem thêm bài viết
          </Button>
        </div>
      </section>
    </div>
  );
}

"use client";

import { NewsPostFormValues } from "@/types/news";
import { ProgramHighlights } from "./ProgramHighlights";
import { TrainingCard } from "./TrainingCard";

type Props = {
  news: NewsPostFormValues[];
};

export function TrainingPrograms({ news = [] }: Props) {
  console.log(news);
  return (
    <section className="w-full">
      <ProgramHighlights />

      <div className="mt-5">
        <h2 className="text-[13px] font-bold uppercase tracking-tight text-gray-900">
          Chương trình tập tại Curves
        </h2>

        <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((newsItem) => (
            <TrainingCard key={newsItem.id} newsItem={newsItem} />
          ))}
        </div>
      </div>
    </section>
  );
}

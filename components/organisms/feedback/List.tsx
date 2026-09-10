"use client";

import Masonry from "react-masonry-css";
import { useFeedback } from "@/hooks/useFeedback";
import { useEffect, useRef } from "react";
import { HeroSection } from "./Hero";
import { FeedbackCardSkeleton, SideVisual } from "./SideVisual";

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1,
};

export const FeedbackList = () => {
  const { feedbacks, hasMore, isLoading, isLoadingMore, loadMore } =
    useFeedback();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasMore || isLoading || isLoadingMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "240px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, isLoading, isLoadingMore, loadMore]);

  const showSkeletons = isLoading || isLoadingMore;

  return (
    <div className="min-h-screen bg-violet-50">
      {/* HERO NHỎ */}
      <HeroSection />

      {/* List */}

      <main className="relative z-10 mx-auto -mt-14 max-w-6xl px-6 pb-24">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-5"
          columnClassName="pl-5"
        >
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="mb-5">
              <SideVisual feedback={feedback} />
            </div>
          ))}
          {showSkeletons &&
            Array.from({ length: 6 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="mb-5">
                <FeedbackCardSkeleton />
              </div>
            ))}
        </Masonry>
        {hasMore && (
          <div ref={loadMoreRef} className="h-px" aria-hidden="true" />
        )}
      </main>
    </div>
  );
};

"use client";

import { feedbackService } from "@/services/feedback";
import { MemberFeedback } from "@/types/feedback";
import { useCallback, useEffect, useRef, useState } from "react";

export const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<MemberFeedback[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageRef = useRef(1);
  const isFetchingRef = useRef(false);

  const loadFeedbacks = useCallback(async (page: number) => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    page === 1 ? setIsLoading(true) : setIsLoadingMore(true);

    try {
      const response = await feedbackService.list(page);
      setFeedbacks((current) =>
        page === 1 ? response.items : [...current, ...response.items],
      );
      setHasMore(response.hasMore);
      pageRef.current = page;
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    void loadFeedbacks(1);
  }, [loadFeedbacks]);

  const loadMore = useCallback(() => {
    if (!hasMore || isFetchingRef.current) return;
    void loadFeedbacks(pageRef.current + 1);
  }, [hasMore, loadFeedbacks]);

  return { feedbacks, hasMore, isLoading, isLoadingMore, loadMore };
};

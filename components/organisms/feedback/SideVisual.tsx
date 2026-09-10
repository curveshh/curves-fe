import { Card, CardContent } from "@/components/ui";
import { MemberFeedback } from "@/types/feedback";
import { Star } from "lucide-react";
import { memo } from "react";

type FeedbackCardProps = {
  feedback: MemberFeedback;
};

export const SideVisual = memo(({ feedback }: FeedbackCardProps) => {
  return (
    <Card className="rounded-3xl border-purple-100 bg-white shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-bold text-purple-950">{feedback.fullName}</p>
          <div
            className="flex text-amber-400"
            aria-label={`${feedback.rating}/5 sao`}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="h-4 w-4"
                fill={index < feedback.rating ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>
        <p className="mt-1 text-xs font-medium text-purple-600">
          {feedback.clubName}
        </p>
        <p className="mt-4 leading-7 text-purple-950/80">
          “{feedback.content}”
        </p>
        {feedback.favoriteAspect && (
          <p className="mt-5 text-xs font-semibold text-purple-700">
            Yêu thích: {feedback.favoriteAspect}
          </p>
        )}
      </CardContent>
    </Card>
  );
});

SideVisual.displayName = "SideVisual";

export const FeedbackCardSkeleton = () => (
  <Card className="animate-pulse rounded-3xl border-purple-100 bg-white shadow-md">
    <CardContent className="space-y-4 p-6">
      <div className="h-5 w-2/5 rounded bg-purple-100" />
      <div className="h-3 w-1/3 rounded bg-purple-100" />
      <div className="space-y-2 pt-2">
        <div className="h-4 rounded bg-purple-100" />
        <div className="h-4 rounded bg-purple-100" />
        <div className="h-4 w-3/4 rounded bg-purple-100" />
      </div>
      <div className="h-3 w-1/2 rounded bg-purple-100" />
    </CardContent>
  </Card>
);

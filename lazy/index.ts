import dynamic from "next/dynamic";

export const LazyFeedbackForm = dynamic(
  () => import("@/components/organisms/feedback"),
);

"use client";

import { LazyFeedbackForm } from "@/lazy";
import { MessageSquareHeart } from "lucide-react";
import { Button } from "../ui";
import { BaseDialog } from "./Dialog";

export const FeedbackLink = () => {
  return (
    <BaseDialog
      trigger={
        <Button variant="ghost" size="icon" aria-label="Ghi cảm nhận">
          <MessageSquareHeart className="h-5 w-5" />
        </Button>
      }
      content={<LazyFeedbackForm />}
      size="4xl"
      scrollable
      title="Cảm nhận"
      description="Hãy chia sẻ trải nghiệm của bạn tại Curves"
      footer={
        <>
          <Button variant="outline">Hủy</Button>
          <Button type="submit">Gửi cảm nhận</Button>
        </>
      }
    />
  );
};

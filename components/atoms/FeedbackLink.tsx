"use client";

import { ROUTE } from "@/contants/route";
import { MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui";

export const FeedbackLink = () => {
  return (
    <Link href={ROUTE.FEEDBACK}>
      <Button variant="ghost" size="icon" aria-label="Ghi cảm nhận">
        <MessageSquareHeart className="h-5 w-5" />
      </Button>
    </Link>
  );
};

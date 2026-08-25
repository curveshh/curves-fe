"use client";

import { FacebookLink } from "../atoms/FacebookLink";
import { FeedbackLink } from "../atoms/FeedbackLink";
import { PhoneLink } from "../atoms/PhoneLink";
import { ZaloLink } from "../atoms/ZaloLink";

export function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3">
      <FeedbackLink />

      <PhoneLink />

      <FacebookLink />

      <ZaloLink />
    </div>
  );
}

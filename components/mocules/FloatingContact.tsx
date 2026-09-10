"use client";

import { Contact } from "@/schemas/contact";
import { FacebookLink } from "../atoms/FacebookLink";
import { FeedbackLink } from "../atoms/FeedbackLink";
import { PhoneLink } from "../atoms/PhoneLink";
import { ZaloLink } from "../atoms/ZaloLink";

type Props = {
  contact: Contact;
};

export function FloatingContact({ contact }: Props) {
  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3">
      <FeedbackLink />

      <PhoneLink hotline={contact.hotline} />

      <FacebookLink link={contact.facebook} />

      <ZaloLink zalo={contact.zalo} />
    </div>
  );
}

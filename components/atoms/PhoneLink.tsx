import { Phone } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

export const PhoneLink = memo(({ hotline }: { hotline?: string }) => {
  return (
    <Link
      href={`tel:${hotline}`}
      aria-label="Gọi điện"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-110"
    >
      <Phone className="h-5 w-5" />
    </Link>
  );
});

PhoneLink.displayName = "PhoneLink";

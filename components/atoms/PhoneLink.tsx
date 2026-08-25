import { Phone } from "lucide-react";
import Link from "next/link";

const PHONE = "0973163988";

export const PhoneLink = () => {
  return (
    <Link
      href={`tel:${PHONE}`}
      aria-label="Gọi điện"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-110"
    >
      <Phone className="h-5 w-5" />
    </Link>
  );
};

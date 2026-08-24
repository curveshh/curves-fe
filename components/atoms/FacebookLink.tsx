import { Facebook } from "lucide-react";
import Link from "next/link";

export const FacebookLink = () => {
  return (
    <Link
      href="https://m.me/YOUR_PAGE_USERNAME"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Facebook"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:scale-110"
    >
      <Facebook className="h-5 w-5" />
    </Link>
  );
};

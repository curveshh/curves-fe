import Link from "next/link";

const ZALO = "0973163988";

export const ZaloLink = () => {
  return (
    <Link
      href={`https://zalo.me/${ZALO}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Zalo"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition hover:scale-110"
    >
      <span className="text-sm font-bold">Zalo</span>
    </Link>
  );
};

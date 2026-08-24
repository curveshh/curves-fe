"use client";

import { CategoryItem } from "@/types/category";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  categories: CategoryItem[];
};

export default function CurvesNavbar({ categories }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <Image
            src="/images/logo.png"
            alt="Curves"
            width={120}
            height={64}
            className="h-16 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {categories.map((link) => (
            <Link
              key={link.id}
              href={`/${link.slug}`}
              className={`text-sm transition-colors ${
                isActive(`/${link.slug}`)
                  ? "font-medium text-violet-700"
                  : "text-gray-600 hover:text-violet-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            target="_blank"
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-violet-700"
          >
            Đăng nhập
          </Link>
          <Link
            href="/trial-sign-up"
            className="rounded-full bg-violet-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-violet-800"
          >
            Đăng ký tập thử
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {categories.map((link) => (
              <Link
                key={link.id}
                href={`/${link.slug}`}
                onClick={() => setOpen(false)}
                className={`rounded-md px-2 py-2.5 text-sm ${
                  isActive(`/${link.slug}`)
                    ? "font-medium text-violet-700"
                    : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
            <Link
              href="/dang-ky-tap-thu"
              onClick={() => setOpen(false)}
              className="rounded-full bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800"
            >
              Đăng ký tập thử
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { NAV_BAR } from "@/contants/navBar";
import { ROUTE } from "@/contants/route";
import { Crown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href?: string) =>
    !href || href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <main className="flex">
      <aside
        className={`flex h-full flex-col bg-linear-to-b from-purple-950 to-purple-900 text-white w-56`}
      >
        <div className={`flex items-center gap-2 px-5 py-6`}>
          <Link
            href={ROUTE.HOME}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-extrabold tracking-tight"
          >
            Curves<span className="text-pink-400">.</span>
          </Link>
        </div>
        <p className="px-5 pb-4 text-[11px] uppercase tracking-wider text-purple-300">
          Empowering Women
        </p>
        <nav className="flex-1 space-y-1 px-3">
          {NAV_BAR.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors cursor-pointer ${
                  isActive(item.href)
                    ? "bg-white/15 font-semibold text-white"
                    : "text-purple-200 hover:bg-white/5 hover:text-white"
                }`}
                href={item.href || ""}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="m-3 rounded-2xl bg-white/10 p-4 text-center">
          <Crown className="mx-auto mb-2 h-5 w-5 text-pink-300" />
          <p className="mb-2 text-xs text-purple-100">Curves Premium</p>
          <Button
            size="sm"
            className="w-full rounded-full bg-pink-500 text-xs hover:bg-pink-600"
          >
            Nâng cấp ngay
          </Button>
        </div>
      </aside>
      <section className="flex-1 px-4 py-2">{children}</section>
    </main>
  );
}

import { PropsWithChildren } from "react";

export function SectionTitle({ children }: PropsWithChildren) {
  return (
    <div className="mb-4 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-purple-700">
      <span className="h-0.5 w-5 rounded-full bg-amber-400" />
      {children}
    </div>
  );
}

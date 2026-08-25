import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type DialogSize = "sm" | "md" | "lg" | "xl" | "2xl";

interface Props {
  trigger: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  content: ReactNode;

  size?: DialogSize;
  scrollable?: boolean;
  stickyHeader?: boolean;

  className?: string;
  contentClassName?: string;
}

const sizeClasses: Record<DialogSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
};

export const BaseDialog = ({
  trigger,
  title,
  description,
  content,
  size = "md",
  scrollable = false,
  stickyHeader = false,
  className,
  contentClassName,
}: Props) => {
  const hasHeader = title || description;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className={cn(
          "bg-white",
          sizeClasses[size],
          scrollable && "max-h-[90vh] overflow-hidden",
          className,
        )}
      >
        {hasHeader && (
          <DialogHeader
            className={cn(stickyHeader && "sticky top-0 z-10 bg-white pb-4")}
          >
            {title && <DialogTitle>{title}</DialogTitle>}

            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div
          className={cn(
            scrollable && "min-h-0 overflow-y-auto",
            contentClassName,
          )}
        >
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
};

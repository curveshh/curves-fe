import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { memo } from "react";

type Props = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
};

export const FloatingButton = memo(({ onClick, type = "button" }: Props) => {
  return (
    <Button
      size="icon"
      className="
        fixed
        right-6
        bottom-6
        z-50
        size-12
        rounded-full
        shadow-lg
      "
      type={type}
      onClick={onClick}
    >
      <Plus className="size-5" />
    </Button>
  );
});

FloatingButton.displayName = "FloatingButton";

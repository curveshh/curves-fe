import { StoryTemplate } from "@/components/templates/StoryTemplate";
import { PropsWithChildren } from "react";

export default function StoryLayout({ children }: PropsWithChildren) {
  return (
    <StoryTemplate>
      <section>{children}</section>
    </StoryTemplate>
  );
}

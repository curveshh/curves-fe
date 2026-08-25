import DashboardTemplate from "@/components/templates/DashboardTemplate";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <DashboardTemplate>{children}</DashboardTemplate>;
}

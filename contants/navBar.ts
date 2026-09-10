import {
  BadgePercent,
  BarChart3,
  Facebook,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";
import { ROUTE } from "./route";

export const NAV_BAR = [
  { icon: LayoutDashboard, label: "Danh mục", href: ROUTE.DASHBOARD_CATEGORY },
  { icon: LayoutDashboard, label: "Banner", href: ROUTE.DASHBOARD_BANNER },
  { icon: FileText, label: "Bài viết", href: ROUTE.DASHBOARD_POST },
  { icon: BadgePercent, label: "Khuyến mãi", href: ROUTE.DASHBOARD_PROMOTIONS },
  { icon: Facebook, label: "Facebook", href: ROUTE.DASHBOARD_FACEBOOK },
  { icon: MessageSquare, label: "Zalo", href: ROUTE.DASHBOARD_ZALO },
  { icon: BarChart3, label: "Báo cáo" },
  { icon: Settings, label: "Cài đặt", href: ROUTE.DASHBOARD_SETTINGS },
];

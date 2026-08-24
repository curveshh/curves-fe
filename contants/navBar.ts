import {
  BadgePercent,
  BarChart3,
  Bell,
  CalendarDays,
  CreditCard,
  Dumbbell,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogIn,
  MessageSquare,
  Package,
  Settings,
} from "lucide-react";
import { ROUTE } from "./route";

export const NAV_BAR = [
  { icon: LayoutDashboard, label: "Danh mục", href: ROUTE.DASHBOARD_CATEGORY },
  { icon: LayoutDashboard, label: "Banner", href: ROUTE.DASHBOARD_BANNER },
  { icon: FileText, label: "Bài viết", href: ROUTE.DASHBOARD_POST },
  { icon: BadgePercent, label: "Khuyến mãi", href: ROUTE.DASHBOARD_PROMOTIONS },
  { icon: Dumbbell, label: "Huấn luyện viên" },
  { icon: CalendarDays, label: "Lịch tập" },
  { icon: GraduationCap, label: "Lớp học" },
  { icon: Package, label: "Gói tập" },
  { icon: LogIn, label: "Check-in" },
  { icon: CreditCard, label: "Thanh toán" },
  { icon: BarChart3, label: "Báo cáo" },
  { icon: MessageSquare, label: "Tin nhắn" },
  { icon: Bell, label: "Thông báo" },
  { icon: Settings, label: "Cài đặt" },
];

"use client";

import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
} from "@/components/ui";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronRight,
  CreditCard,
  Crown,
  Dumbbell,
  GraduationCap,
  LayoutDashboard,
  LogIn,
  MessageSquare,
  Package,
  Search,
  Settings,
  Upload,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* ---------------- shared data ---------------- */

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Hội viên" },
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

const STATS = [
  {
    label: "Tổng hội viên",
    value: "1,248",
    delta: "+12.5% so với tháng trước",
    icon: Users,
    up: true,
  },
  {
    label: "Hội viên mới hôm nay",
    value: "86",
    delta: "+8.3% so với hôm qua",
    icon: Users,
    up: true,
  },
  {
    label: "Buổi tập hôm nay",
    value: "132",
    delta: "+15.2% so với hôm qua",
    icon: Dumbbell,
    up: true,
  },
  {
    label: "Doanh thu hôm nay",
    value: "28,450,000 đ",
    delta: "+10.7% so với hôm qua",
    icon: CreditCard,
    up: true,
  },
];

const REVENUE = [
  { day: "06/06", value: 14 },
  { day: "07/06", value: 22 },
  { day: "08/06", value: 18 },
  { day: "09/06", value: 30 },
  { day: "10/06", value: 26 },
  { day: "11/06", value: 34 },
  { day: "12/06", value: 28 },
];

const CHECKIN = [
  { name: "Đã check-in", value: 64.2, color: "#22c55e" },
  { name: "Chưa check-in", value: 35.8, color: "#e9e3f0" },
];

const SCHEDULE = [
  {
    name: "Giang Trainer",
    cls: "Yoga cơ bản",
    time: "07:00",
    color: "bg-purple-600",
  },
  {
    name: "Strength 30",
    cls: "HLV Lan Chi",
    time: "08:30",
    color: "bg-fuchsia-500",
  },
  {
    name: "Zumba Dance",
    cls: "HLV Minh Thư",
    time: "17:00",
    color: "bg-pink-500",
  },
];

const TOP_MEMBERS = [
  { name: "Trần Bảo Ngọc", pkg: "6 tháng", date: "12/06/2024", sessions: 2450 },
  { name: "Lê Minh Phương", pkg: "1 năm", date: "12/06/2024", sessions: 2180 },
  {
    name: "Phạm Thùy Linh",
    pkg: "3 tháng",
    date: "11/06/2024",
    sessions: 1920,
  },
  { name: "Nguyễn Mai An", pkg: "6 tháng", date: "11/06/2024", sessions: 1745 },
  { name: "Võ Minh Anh", pkg: "1 năm", date: "10/06/2024", sessions: 1602 },
];

const AGE = [
  { name: "18 - 25", value: 21, color: "#3d1653" },
  { name: "26 - 35", value: 38, color: "#9433c4" },
  { name: "36 - 45", value: 27, color: "#c77ee6" },
  { name: "46+", value: 14, color: "#e9c9f5" },
];

/* ---------------- small building blocks ---------------- */

function StatCard({ stat, compact }) {
  const Icon = stat.icon;
  return (
    <Card className="border-purple-100 shadow-sm">
      <CardContent className={compact ? "p-3.5" : "p-5"}>
        <div className="mb-2 flex items-center justify-between">
          <span
            className={`text-purple-400 ${compact ? "text-[11px]" : "text-xs"}`}
          >
            {stat.label}
          </span>
          <div
            className={`flex items-center justify-center rounded-full bg-purple-50 text-purple-600 ${compact ? "h-6 w-6" : "h-8 w-8"}`}
          >
            <Icon className={compact ? "h-3 w-3" : "h-4 w-4"} />
          </div>
        </div>
        <div
          className={`font-extrabold text-purple-950 ${compact ? "text-lg" : "text-2xl"}`}
        >
          {stat.value}
        </div>
        <div
          className={`mt-1 flex items-center gap-1 text-emerald-600 ${compact ? "text-[10px]" : "text-xs"}`}
        >
          <ArrowUp className={compact ? "h-2.5 w-2.5" : "h-3 w-3"} />
          <span className="truncate">{stat.delta}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function DonutMini({ data, size = 90, thickness = 14 }) {
  return (
    <PieChart width={size} height={size}>
      <Pie
        data={data}
        dataKey="value"
        innerRadius={size / 2 - thickness}
        outerRadius={size / 2}
        startAngle={90}
        endAngle={-270}
        stroke="none"
      >
        {data.map((d, i) => (
          <Cell key={i} fill={d.color} />
        ))}
      </Pie>
    </PieChart>
  );
}

/* ---------------- sidebar ---------------- */

function Sidebar({ compact }) {
  return (
    <aside
      className={`flex h-full flex-col bg-gradient-to-b from-purple-950 to-purple-900 text-white ${compact ? "w-16" : "w-56"}`}
    >
      <div
        className={`flex items-center gap-2 px-5 py-6 ${compact ? "justify-center px-0" : ""}`}
      >
        <div className="text-xl font-extrabold tracking-tight">
          {compact ? (
            "C"
          ) : (
            <>
              Curves<span className="text-pink-400">.</span>
            </>
          )}
        </div>
      </div>
      {!compact && (
        <p className="px-5 pb-4 text-[11px] uppercase tracking-wider text-purple-300">
          Empowering Women
        </p>
      )}
      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                item.active
                  ? "bg-white/15 font-semibold text-white"
                  : "text-purple-200 hover:bg-white/5 hover:text-white"
              } ${compact ? "justify-center px-0" : ""}`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!compact && <span>{item.label}</span>}
            </div>
          );
        })}
      </nav>
      {!compact && (
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
      )}
    </aside>
  );
}

/* ---------------- DESKTOP DASHBOARD ---------------- */

function DesktopDashboard() {
  return (
    <div className="flex h-[820px] w-full max-w-[1040px] overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-purple-950/20 ring-1 ring-purple-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-[#faf8fc] p-7">
        {/* topbar */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-purple-950">
              Dashboard
            </h1>
            <p className="text-sm text-purple-400">
              Chào mừng trở lại, Thu Hương!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-purple-100 bg-white px-3.5 py-2 text-xs text-purple-500">
              <Search className="h-3.5 w-3.5" />
              Hôm nay 12/06/2024
            </div>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-purple-100 bg-white">
              <Bell className="h-4 w-4 text-purple-600" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-pink-500" />
            </button>
            <Avatar className="h-9 w-9 ring-2 ring-purple-100">
              <AvatarFallback className="bg-purple-700 text-xs text-white">
                TH
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* stat cards */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        {/* row 2: revenue / checkin / schedule */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <Card className="col-span-1 border-purple-100 shadow-sm">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-purple-950">Doanh thu</h3>
                <Badge
                  variant="secondary"
                  className="bg-purple-50 text-[11px] text-purple-600 hover:bg-purple-50"
                >
                  7 ngày qua
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart
                  data={REVENUE}
                  margin={{ top: 4, right: 0, left: -28, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#9433c4"
                        stopOpacity={0.35}
                      />
                      <stop offset="100%" stopColor="#9433c4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 9, fill: "#b3a2c2" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      fontSize: 11,
                      borderRadius: 8,
                      borderColor: "#e9def0",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#7a2ba3"
                    strokeWidth={2.5}
                    fill="url(#rev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1 border-purple-100 shadow-sm">
            <CardContent className="p-5">
              <h3 className="mb-3 text-sm font-bold text-purple-950">
                Tình trạng check-in hôm nay
              </h3>
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <DonutMini data={CHECKIN} size={100} thickness={15} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-extrabold text-purple-950">
                      132
                    </span>
                    <span className="text-[9px] text-purple-400">
                      buổi hôm nay
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-purple-500">Đã check-in</span>
                    <span className="font-bold text-purple-950">64.2%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-purple-100" />
                    <span className="text-purple-500">Chưa check-in</span>
                    <span className="font-bold text-purple-950">35.8%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 border-purple-100 shadow-sm">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-purple-950">
                  Lịch tập tiếp theo
                </h3>
                <span className="flex items-center text-[11px] font-semibold text-purple-500">
                  Xem tất cả <ChevronRight className="h-3 w-3" />
                </span>
              </div>
              <div className="space-y-3">
                {SCHEDULE.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span
                      className={`h-8 w-8 flex-shrink-0 rounded-full ${s.color}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-purple-950">
                        {s.name}
                      </p>
                      <p className="truncate text-[11px] text-purple-400">
                        {s.cls}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-purple-700">
                      {s.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* row 3: top members / age distribution */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-2 border-purple-100 shadow-sm">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-purple-950">
                  Top hội viên tích cực
                </h3>
                <span className="flex items-center text-[11px] font-semibold text-purple-500">
                  Xem tất cả <ChevronRight className="h-3 w-3" />
                </span>
              </div>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-purple-400">
                    <th className="pb-2 font-medium">Hạng</th>
                    <th className="pb-2 font-medium">Hội viên</th>
                    <th className="pb-2 font-medium">Gói tập</th>
                    <th className="pb-2 font-medium">Check-in gần nhất</th>
                    <th className="pb-2 text-right font-medium">Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_MEMBERS.map((m, i) => (
                    <tr key={m.name} className="border-t border-purple-50">
                      <td className="py-2.5 font-bold text-purple-700">
                        {i + 1}
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-purple-100 text-[10px] text-purple-700">
                              {m.name.split(" ").slice(-1)[0][0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-purple-950">
                            {m.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 text-purple-500">{m.pkg}</td>
                      <td className="py-2.5 text-purple-500">{m.date}</td>
                      <td className="py-2.5 text-right font-bold text-purple-950">
                        {m.sessions.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card className="col-span-1 border-purple-100 shadow-sm">
            <CardContent className="p-5">
              <h3 className="mb-3 text-sm font-bold text-purple-950">
                Phân bổ hội viên theo độ tuổi
              </h3>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <DonutMini data={AGE} size={120} thickness={18} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-extrabold text-purple-950">
                      1,248
                    </span>
                    <span className="text-[9px] text-purple-400">hội viên</span>
                  </div>
                </div>
                <div className="mt-4 grid w-full grid-cols-2 gap-2 text-[11px]">
                  {AGE.map((a) => (
                    <div key={a.name} className="flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: a.color }}
                      />
                      <span className="text-purple-500">{a.name}</span>
                      <span className="ml-auto font-bold text-purple-950">
                        {a.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MOBILE DASHBOARD ---------------- */

function MobileDashboard() {
  return (
    <div className="relative mx-auto h-[820px] w-[300px] flex-shrink-0 overflow-hidden rounded-[2.5rem] border-[8px] border-purple-950 bg-white shadow-2xl">
      {/* notch */}
      <div className="absolute left-1/2 top-0 z-20 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-purple-950" />

      <div className="h-full overflow-y-auto bg-[#faf8fc] pb-6 pt-7">
        {/* header */}
        <div className="rounded-b-3xl bg-gradient-to-br from-purple-900 to-purple-700 px-5 pb-6 pt-3 text-white">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-lg font-extrabold">
              Curves<span className="text-pink-300">.</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <Avatar className="h-6 w-6 ring-1 ring-white/50">
                <AvatarFallback className="bg-white/20 text-[9px] text-white">
                  TH
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="text-[11px] text-purple-100">
            Chào mừng trở lại, Thu Hương!
          </p>
        </div>

        <div className="-mt-4 px-4">
          {/* stat cards 2x2 */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <StatCard key={s.label} stat={s} compact />
            ))}
          </div>

          {/* revenue */}
          <Card className="mb-4 border-purple-100 shadow-sm">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xs font-bold text-purple-950">
                  Doanh thu 7 ngày qua
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={90}>
                <LineChart
                  data={REVENUE}
                  margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
                >
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 8, fill: "#b3a2c2" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#7a2ba3"
                    strokeWidth={2}
                    dot={{ r: 2, fill: "#7a2ba3" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* schedule */}
          <Card className="mb-4 border-purple-100 shadow-sm">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-bold text-purple-950">
                  Lịch tập tiếp theo
                </h3>
                <span className="text-[10px] font-semibold text-purple-500">
                  Xem tất cả
                </span>
              </div>
              <div className="space-y-3">
                {SCHEDULE.map((s) => (
                  <div key={s.name} className="flex items-center gap-2.5">
                    <span
                      className={`h-7 w-7 flex-shrink-0 rounded-full ${s.color}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold text-purple-950">
                        {s.name}
                      </p>
                      <p className="truncate text-[10px] text-purple-400">
                        {s.cls}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-purple-700">
                      {s.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* checkin donut */}
          <Card className="border-purple-100 shadow-sm">
            <CardContent className="p-4">
              <h3 className="mb-3 text-xs font-bold text-purple-950">
                Check-in hôm nay
              </h3>
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <DonutMini data={CHECKIN} size={72} thickness={11} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-extrabold text-purple-950">
                      132
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-purple-500">Đã check-in 64.2%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-purple-100" />
                    <span className="text-purple-500">Chưa check-in 35.8%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* floating action buttons */}
      <div className="absolute bottom-5 right-5 flex flex-col gap-2.5">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-950 text-white shadow-lg">
          <ArrowDown className="h-4 w-4" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-purple-700 shadow-lg ring-1 ring-purple-100">
          <Upload className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------------- root ---------------- */

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f4f2f7] p-6 lg:p-10">
      <div className="mx-auto flex max-w-[1500px] flex-col items-start gap-8 xl:flex-row xl:justify-center">
        <DesktopDashboard />
        <MobileDashboard />
      </div>
    </div>
  );
}

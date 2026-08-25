import { Clock3, Dumbbell, Heart, UserRound } from "lucide-react";

export const ProgramHighlights = () => {
  const highlights = [
    {
      icon: Clock3,
      value: "30 phút",
      label: "tập mỗi buổi",
    },
    {
      icon: Dumbbell,
      value: "12 máy tập",
      label: "kháng lực thủy lực",
    },
    {
      icon: UserRound,
      value: "Dành riêng cho nữ",
      label: "thoải mái & tự tin",
    },
    {
      icon: Heart,
      value: "Huấn luyện viên",
      label: "đồng hành",
    },
  ];

  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] md:grid-cols-4">
      {highlights.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={item.value}
            className="flex items-center gap-3 px-4 py-2 md:px-5"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-purple-50">
              <Icon className="size-5 text-purple-600" strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-gray-900 md:text-[13px]">
                {item.value}
              </p>

              <p className="truncate text-[10px] leading-4 text-gray-500 md:text-[11px]">
                {item.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const CLUBS = [{ value: 1, label: "Hà Đông" }];

export const DURATIONS = [{ value: 1, label: "Dưới 3 tháng" }];

export const RATING_LABELS = {
  1: "Rất tệ",
  2: "Chưa tốt",
  3: "Bình thường",
  4: "Hài lòng",
  5: "Xuất sắc",
};

export type Rating = 1 | 2 | 3 | 4 | 5;

export const RATINGS: Rating[] = [1, 2, 3, 4, 5];

export const FAVORITES = [
  {
    label: "Phương pháp tập",
    value: "training_method",
  },
  {
    label: "HLV",
    value: "coach",
  },
  {
    label: "Không gian",
    value: "space",
  },
  {
    label: "Cộng đồng",
    value: "community",
  },
  {
    label: "Khác",
    value: "other",
  },
] as const;

export const TYPE = {
  GRADIENT: "GRADIENT",
  IMAGE: "IMAGE",
} as const;

export const BG_TYPE = [
  { value: TYPE.GRADIENT, label: "Gradient" },
  { value: TYPE.IMAGE, label: "Hình ảnh" },
];

export const BG_PRESETS = [
  { name: "Tím Curves", from: "#9b6fd6", to: "#5b2a9e" },
  { name: "Hồng đào", from: "#f472b6", to: "#a3197a" },
  { name: "Cam rực", from: "#ffb454", to: "#e8590c" },
  { name: "Xanh biển", from: "#5eead4", to: "#0e7490" },
  { name: "Xanh dương", from: "#7dd3fc", to: "#1e40af" },
  { name: "Đen sang", from: "#4b5563", to: "#111827" },
];

import { api } from "@/lib/api/axios";

export type Club = {
  id: string;
  name: string;
  address: string;
  distance: string;
  image: string;
};

export async function getClubs(): Promise<Club[]> {
  try {
    return (await api.get<Club[]>("/clubs")).data;
  } catch {
    return fallbackClubs;
  }
}

export const fallbackClubs: Club[] = [
  {
    id: "1",
    name: "Curves Nguyễn Thái Học",
    address: "Quận 1, TP. Hồ Chí Minh",
    distance: "2.1 km",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "2",
    name: "Curves Phú Nhuận",
    address: "Quận Phú Nhuận, TP. HCM",
    distance: "4.3 km",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "3",
    name: "Curves Thảo Điền",
    address: "Quận 2, TP. Hồ Chí Minh",
    distance: "7.5 km",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "4",
    name: "Curves Hồ Chí Minh",
    address: "Quận Cầu Giấy, Hà Nội",
    distance: "8.2 km",
    image:
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=700&q=85",
  },
];

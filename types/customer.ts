export interface Customer {
  name: string;
  zalo?: string;
  phone?: string;
  facebookUrl?: string;
  createdAt: string;
  note?: string;
}

export const CHANNELS = {
  FACEBOOK: "FACEBOOK",
  ZALO: "ZALO",
} as const;

export type Channel = keyof typeof CHANNELS;

export interface Banner {
  id: string;
  image?: File;
  imageUrl?: string;
  header: string;
  primaryText: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  isDraft?: boolean;
}

export type MoveBannerReq = { id: string; order: number };

export type UpdateBannerRequest = {
  id: string;
  req: Partial<Banner>;
};

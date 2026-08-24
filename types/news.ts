export type PublicationStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type NewsPostFormValues = {
  id?: string;
  categoryId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: File | null;
  coverImageUrl?: string;
  status: PublicationStatus;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  isHome: boolean;
};

export type NewsListParams = {
  limit?: number;
  page?: number;
  isHome?: boolean;
  category?: string;
};

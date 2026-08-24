export const QUERY_KEYS = {
  CATEGORIES: ["categories"],
  NEWS: ["news"],
  NEWS_BY_SLUG: (slug: string) => ["slug", slug],
  BANNERS: ["banners"],
  PROMOTIONS: (keyword: string) => ["promotion", keyword],
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  menu: string;
  status: "draft" | "published";
  updatedAt: string;
};
export type Banner = {
  id: string;
  placement: "hero" | "sub";
  title: string;
  imageUrl: string;
  link: string;
  active: boolean;
};

export const contentDb: { posts: Post[]; banners: Banner[] } = {
  posts: [
    {
      id: "post-1",
      title: "Bí quyết khỏe đẹp mỗi ngày",
      slug: "bi-quyet-khoe-dep",
      content: "<p>Nội dung bài viết mẫu của Curves.</p>",
      menu: "tin-tuc",
      status: "published",
      updatedAt: "2026-08-10",
    },
  ],
  banners: [
    {
      id: "banner-1",
      placement: "hero",
      title: "30 phút mỗi ngày",
      imageUrl:
        "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=1800&q=90",
      link: "/dang-ky-tap-thu",
      active: true,
    },
    {
      id: "banner-2",
      placement: "sub",
      title: "Khám phá chương trình Curves",
      imageUrl:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85",
      link: "/chuong-trinh-tap",
      active: true,
    },
  ],
};

export const createId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

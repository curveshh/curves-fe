export type SitePage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: { title: string; text: string }[];
};

export type MenuItem = Pick<SitePage, "slug" | "title">;

// Fallback local only: website vẫn hiển thị được trước khi CONTENT_API_URL sẵn sàng.
const fallbackPages: Record<string, SitePage> = {
  "ve-curves": {
    slug: "ve-curves",
    eyebrow: "Câu chuyện Curves",
    title: "Nơi phụ nữ khỏe hơn và tự tin hơn",
    description:
      "Curves mang đến một không gian tập luyện thân thiện, được thiết kế riêng cho phụ nữ ở mọi độ tuổi.",
    highlights: [
      {
        title: "Hơn 30 năm",
        text: "đồng hành cùng phụ nữ trên toàn thế giới.",
      },
      {
        title: "Môi trường riêng tư",
        text: "để bạn thoải mái bắt đầu hành trình của mình.",
      },
      {
        title: "Huấn luyện tận tâm",
        text: "cùng đội ngũ luôn sẵn sàng hỗ trợ bạn.",
      },
    ],
  },
  "chuong-trinh-tap": {
    slug: "chuong-trinh-tap",
    eyebrow: "Curves Circuit",
    title: "Tập đủ cơ thể chỉ trong 30 phút",
    description:
      "Bài tập kết hợp cardio, máy kháng lực thủy lực và giãn cơ giúp bạn duy trì phong độ một cách bền vững.",
    highlights: [
      { title: "Khởi động", text: "làm nóng cơ thể trong vài phút đầu." },
      {
        title: "12 trạm tập",
        text: "luân phiên sức mạnh và cardio nhịp nhàng.",
      },
      { title: "Giãn cơ", text: "kết thúc bài tập nhẹ nhàng, thư thái." },
    ],
  },
  "cau-lac-bo": {
    slug: "cau-lac-bo",
    eyebrow: "Không gian của bạn",
    title: "Tìm Curves gần bạn nhất",
    description:
      "Các câu lạc bộ Curves luôn sẵn sàng chào đón bạn với không khí gần gũi, đầy năng lượng.",
    highlights: [
      { title: "Phòng tập hiện đại", text: "đủ dụng cụ cho vòng tập Curves." },
      {
        title: "Khung giờ linh hoạt",
        text: "dễ dàng phù hợp với lịch bận rộn.",
      },
      { title: "Cộng đồng tích cực", text: "cùng nhau tạo động lực mỗi ngày." },
    ],
  },
  "bang-gia": {
    slug: "bang-gia",
    eyebrow: "Hội viên Curves",
    title: "Gói tập linh hoạt cho hành trình của bạn",
    description:
      "Chọn gói hội viên phù hợp và nhận tư vấn riêng từ đội ngũ Curves gần bạn.",
    highlights: [
      {
        title: "Tập không giới hạn",
        text: "tham gia các buổi tập theo lịch câu lạc bộ.",
      },
      {
        title: "Tư vấn cá nhân",
        text: "đồng hành cùng mục tiêu sức khỏe của bạn.",
      },
      { title: "Ưu đãi tập thử", text: "bắt đầu hoàn toàn miễn phí." },
    ],
  },
  "tin-tuc": {
    slug: "tin-tuc",
    eyebrow: "Góc Curves",
    title: "Cảm hứng sống khỏe mỗi ngày",
    description:
      "Khám phá các câu chuyện hội viên, bí quyết vận động và dinh dưỡng đơn giản từ Curves.",
    highlights: [
      {
        title: "Câu chuyện hội viên",
        text: "những thay đổi tích cực từ cộng đồng Curves.",
      },
      { title: "Mẹo sức khỏe", text: "thói quen nhỏ, hiệu quả lớn mỗi ngày." },
      { title: "Hoạt động mới", text: "cập nhật tin tức tại các câu lạc bộ." },
    ],
  },
  "lien-he": {
    slug: "lien-he",
    eyebrow: "Curves Việt Nam",
    title: "Chúng tôi luôn sẵn sàng lắng nghe",
    description:
      "Hãy liên hệ với Curves để được tư vấn về chương trình, gói tập hoặc câu lạc bộ gần bạn.",
    highlights: [
      { title: "Hotline", text: "1900 1234" },
      { title: "Email", text: "info@curves.com.vn" },
      { title: "Giờ mở cửa", text: "06:00 – 21:00 mỗi ngày" },
    ],
  },
  "dang-nhap": {
    slug: "dang-nhap",
    eyebrow: "Cổng hội viên",
    title: "Chào mừng bạn trở lại",
    description:
      "Đăng nhập để theo dõi lịch tập, thông tin hội viên và các ưu đãi mới từ Curves.",
    highlights: [
      { title: "Lịch tập", text: "quản lý hành trình mỗi tuần." },
      { title: "Thông tin hội viên", text: "cập nhật nhanh chóng, bảo mật." },
      { title: "Ưu đãi riêng", text: "dành cho cộng đồng Curves." },
    ],
  },
  "dang-ky-tap-thu": {
    slug: "dang-ky-tap-thu",
    eyebrow: "Bắt đầu hôm nay",
    title: "Đăng ký tập thử Curves miễn phí",
    description:
      "Để lại thông tin, chúng tôi sẽ liên hệ và sắp xếp buổi tập thử phù hợp với bạn.",
    highlights: [
      {
        title: "Không cam kết",
        text: "trải nghiệm Curves trước khi quyết định.",
      },
      { title: "Được hướng dẫn", text: "bởi huấn luyện viên tại câu lạc bộ." },
      { title: "Chỉ 30 phút", text: "một buổi tập tràn năng lượng." },
    ],
  },
};

const contentApiUrl = process.env.CONTENT_API_URL?.replace(/\/$/, "");

async function contentFetch<T>(path: string): Promise<T | undefined> {
  if (!contentApiUrl) return undefined;
  try {
    const response = await fetch(`${contentApiUrl}${path}`, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });
    return response.ok ? (response.json() as Promise<T>) : undefined;
  } catch {
    return undefined;
  }
}

/** Dynamic CMS content. Expected endpoint: GET {CONTENT_API_URL}/pages/:slug */
export async function getSitePage(slug: string): Promise<SitePage | undefined> {
  return (
    (await contentFetch<SitePage>(`/pages/${encodeURIComponent(slug)}`)) ??
    fallbackPages[slug]
  );
}

/** Dynamic menu. Expected endpoint: GET {CONTENT_API_URL}/menus/main */
export async function getMainMenu(): Promise<MenuItem[]> {
  return (
    (await contentFetch<MenuItem[]>("/menus/main")) ??
    Object.values(fallbackPages)
      .filter((page) => !["dang-nhap", "dang-ky-tap-thu"].includes(page.slug))
      .map(({ slug, title }) => ({ slug, title }))
  );
}

// Các trang seed để có thể SSG ngay; slug từ CMS vẫn được render động nhờ dynamicParams = true.
export const seedPageSlugs = Object.keys(fallbackPages);

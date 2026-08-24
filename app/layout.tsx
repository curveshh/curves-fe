import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: siteName,
  title: {
    default: "Curves Vietnam | Tập luyện 30 phút dành cho phụ nữ",
    template: "%s | Curves Vietnam",
  },
  description:
    "Curves Vietnam mang đến chương trình tập luyện 30 phút hiệu quả, thân thiện và được thiết kế dành riêng cho phụ nữ.",
  keywords: ["Curves Vietnam", "tập luyện cho phụ nữ", "gym nữ", "tập 30 phút"],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName,
    title: "Curves Vietnam | Tập luyện 30 phút dành cho phụ nữ",
    description:
      "Không gian tập luyện thân thiện, được thiết kế dành riêng cho phụ nữ.",
    url: "/",
  },
  twitter: { card: "summary" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

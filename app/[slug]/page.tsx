import { MainTemplate } from "@/components/templates/MainTemplate";
import { getSitePage, seedPageSlugs } from "@/lib/content/site-pages";
import { notFound } from "next/navigation";

export const revalidate = 300;
export const dynamicParams = true;

export function generateStaticParams() {
  return seedPageSlugs.map((slug) => ({ slug }));
}

export default async function SitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = await getSitePage((await params).slug);

  if (!page) notFound();

  return <MainTemplate>a</MainTemplate>;
}

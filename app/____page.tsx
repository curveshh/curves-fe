import { HomePage } from "@/components/home-page";
import { getClubsServer } from "@/lib/api/server";
import { getMainMenu } from "@/lib/content/site-pages";

// Server Component: thay bằng fetch(..., { next: { revalidate: 300 } }) khi API public sẵn sàng.
export const revalidate = 300;

export default async function Page() {
  // Fetch trên Server Component cho SSR/ISR; initial data được hydrate vào TanStack Query ở client.
  const [clubs, menu] = await Promise.all([getClubsServer(), getMainMenu()]);
  return <HomePage initialClubs={clubs} initialMenu={menu} />;
}

import { fallbackClubs, type Club } from "@/lib/api/club";

/** Server-only API entry point. `fetch` keeps Next.js data cache, SSR and ISR available. */
export async function getClubsServer(): Promise<Club[]> {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) return fallbackClubs;

  try {
    const response = await fetch(`${apiUrl}/clubs`, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Club API returned ${response.status}`);
    return response.json() as Promise<Club[]>;
  } catch {
    return fallbackClubs;
  }
}

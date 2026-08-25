import { API } from "@/contants/api";
import { baseURL } from "@/lib/api/axios";
import CurvesNavbar from "../mocules/NavBar";

async function getMenus() {
  const response = await fetch(`${baseURL}${API.CATEGORY}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const result = await response.json();

  return result.data ?? [];
}

export async function MainTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getMenus();

  return (
    <main>
      <CurvesNavbar categories={categories} />
      {children}
    </main>
  );
}

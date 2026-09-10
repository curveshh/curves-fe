import { FloatingContact } from "@/components/mocules/FloatingContact";
import { Footer } from "@/components/organisms/Footer";
import { MainTemplate } from "@/components/templates/MainTemplate";
import { getContact } from "@/services/contact";
import NotFound from "../not-found";

export default async function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getContact();

  if (!data) {
    return <NotFound />;
  }

  return (
    <MainTemplate>
      {children}
      <Footer />
      <FloatingContact contact={data} />
    </MainTemplate>
  );
}

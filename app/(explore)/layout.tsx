import { FloatingContact } from "@/components/mocules/FloatingContact";
import { Footer } from "@/components/organisms/Footer";
import { MainTemplate } from "@/components/templates/MainTemplate";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainTemplate>
      {children}
      <Footer />
      <FloatingContact />
    </MainTemplate>
  );
}

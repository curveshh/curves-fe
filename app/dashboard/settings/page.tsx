import { SettingsComponent } from "@/components/organisms/dashboard/settings";
import { getContact } from "@/services/contact";
import { notFound } from "next/navigation";

export default async function SettingsPage() {
  const { data } = await getContact();

  if (!data) {
    return notFound();
  }

  return <SettingsComponent contact={data} />;
}

import { Contact } from "@/schemas/contact";
import { SettingContacts } from "./contact";

type Props = {
  contact: Contact;
};

export const SettingsComponent = ({ contact }: Props) => {
  return (
    <main>
      <SettingContacts contact={contact} />
    </main>
  );
};

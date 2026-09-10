import SocialUserManager from "@/components/organisms/dashboard/social/SocialUserManager";
import { CHANNELS } from "@/types/customer";

export default function FacebookPage() {
  return <SocialUserManager channel={CHANNELS.FACEBOOK} />;
}

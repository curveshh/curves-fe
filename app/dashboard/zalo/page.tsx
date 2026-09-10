import SocialUserManager from "@/components/organisms/dashboard/social/SocialUserManager";
import { CHANNELS } from "@/types/customer";

export default function ZaloPage() {
  return <SocialUserManager channel={CHANNELS.ZALO} />;
}

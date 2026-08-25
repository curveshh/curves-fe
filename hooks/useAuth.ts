import { ROUTE } from "@/contants/route";
import { useApiMutation } from "@/queries/use-api-mutation";
import { LoginValues } from "@/schemas/login";
import { authServices } from "@/services/auth";
import { useAuthStore } from "@/stores/auth";
import { LoginRes } from "@/types/login";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const route = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);
  const setSession = useAuthStore((state) => state.setSession);

  const login = useApiMutation<LoginRes, LoginValues>({
    mutationFn: (req: LoginValues) => authServices.login(req),
    onSuccess: ({ data: { accessToken } }) => {
      setSession(accessToken);
      route.replace(ROUTE.DASHBOARD_BANNER);
    },
  });

  const logout = useMutation({
    mutationFn: () => authServices.logout(),
    onSuccess: () => {
      clearSession();
      route.replace(ROUTE.LOGIN);
    },
  });

  return {
    login,
    logout,
  };
};

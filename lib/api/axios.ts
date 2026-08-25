import { useAuthStore } from "@/stores/auth";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

type RetryConfig = InternalAxiosRequestConfig & {
  _retried?: boolean;
};

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  if (!refreshPromise) {
    refreshPromise = api
      .post<{ data: { accessToken: string } }>("/auth/refresh")
      .then((response) => {
        const accessToken = response.data.data.accessToken;

        useAuthStore.getState().setSession(accessToken);

        return accessToken;
      })
      .catch(() => {
        useAuthStore.getState().clearSession();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const request = error.config as RetryConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !request ||
      request._retried ||
      request.url === "/auth/refresh"
    ) {
      return Promise.reject(error);
    }

    request._retried = true;

    const accessToken = await refreshAccessToken();

    if (!accessToken) {
      return Promise.reject(error);
    }

    request.headers.Authorization = `Bearer ${accessToken}`;

    return api(request);
  },
);

export const http = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.get<T>(url, config);
    return response.data;
  },

  post: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await api.post<T>(url, data, config);
    return response.data;
  },

  put: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await api.put<T>(url, data, config);
    return response.data;
  },

  patch: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await api.patch<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.delete<T>(url, config);
    return response.data;
  },
};

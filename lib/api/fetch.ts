const baseURL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

type BaseFetchOptions = RequestInit & {
  next?: NextFetchRequestConfig;
};

export async function baseFetch<T>(
  path: string,
  options?: BaseFetchOptions,
): Promise<T> {
  const response = await fetch(`${baseURL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();

    throw new Error(error || `API request failed: ${response.status}`);
  }

  return response.json();
}

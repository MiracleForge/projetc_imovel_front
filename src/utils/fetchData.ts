type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  authToken?: string | null;
  isPublic?: boolean;
};

export function createFetcher<Payload = unknown, Response = unknown>(
  path: string,
  defaultOptions?: FetcherOptions
) {
  return async (payload?: Payload, options?: FetcherOptions): Promise<Response> => {
    const finalOptions = {
      ...defaultOptions,
      ...options
    };

    const finalHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(finalOptions.headers ?? {}),
    };

    if (!finalOptions.isPublic) {
      const token = await callAuthorization();
      finalHeaders["Authorization"] = `Bearer ${token}`;
    } else if (finalOptions.authToken) {
      finalHeaders["Authorization"] = `Bearer ${finalOptions.authToken}`;
    }

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://www.minhaapi.com";

    const url = new URL(path, baseUrl).toString();

    const response = await fetch(url, {
      method: finalOptions.method ?? "POST",
      headers: finalHeaders,
      body:
        ["POST", "PUT", "PATCH"].includes(finalOptions.method ?? "POST") && payload
          ? JSON.stringify(payload)
          : undefined,
    });

    return (await response.json()) as Response;
  };
};

const callAuthorization = async (): Promise<string> => {
  return "du3u4h5u4h5u4h65u45h4unrfuntun64u5nu3n4u4n34n3"
}

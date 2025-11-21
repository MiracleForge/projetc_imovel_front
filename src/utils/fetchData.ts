import { actionResponse } from "../schemasTypes/types/responses.core";

type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  authToken?: string | null;
  isPublic?: boolean;
};

export function createFetcher<Payload = unknown, Data = unknown>(
  path: string,
  defaultOptions?: FetcherOptions
) {
  return async (payload?: Payload, options?: FetcherOptions): Promise<actionResponse<Data>> => {
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

    try {

      const response = await fetch(url, {
        method: finalOptions.method ?? "POST",
        headers: finalHeaders,
        body:
          ["POST", "PUT", "PATCH"].includes(finalOptions.method ?? "POST") && payload
            ? JSON.stringify(payload)
            : undefined,
      });

      const json = await response.json();
      if (!response.ok) return { message: json.message ?? response.statusText, error: json.error ?? response.status } as actionResponse<Data>;

      return json as actionResponse<Data>;
    } catch (error) {
      return { message: "Erro interno do servidor", error: "INTERNAL_SERVER_ERROR" } as actionResponse<Data>;
    }
  };
};

const callAuthorization = async (): Promise<string> => {
  return "du3u4h5u4h5u4h65u45h4unrfuntun64u5nu3n4u4n34n3"
}

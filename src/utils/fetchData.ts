import { actionResponse } from "../contracts/types/responses.core";

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
      const accessToken = await callAuthorization();
      finalHeaders["Authorization"] = `Bearer ${accessToken}`;
    } else if (finalOptions.authToken) {
      finalHeaders["Authorization"] = `Bearer ${finalOptions.authToken}`;
    }

    const isFullURL = path.startsWith("http://") || path.startsWith("https://");

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_DEV
        : process.env.NEXT_PUBLIC_API_PROD;

    const url = isFullURL ? path : `${baseUrl}${path}`;

    let body: any = undefined;

    if (["POST", "PUT", "PATCH"].includes(finalOptions.method ?? "POST") && payload) {
      if (finalHeaders["Content-Type"] === "application/x-www-form-urlencoded") {
        body = new URLSearchParams(payload as Record<string, string>).toString();
      } else {
        body = JSON.stringify(payload);
      }
    }

    try {

      const response = await fetch(url ?? path, {
        method: finalOptions.method ?? "POST",
        headers: finalHeaders,
        body
      });

      const json = await response.json();
      if (!response.ok) return { message: json.message ?? response.statusText, error: json.error ?? response.status } as actionResponse<Data>;

      return {
        data: json as Data,
        message: "",
        error: "",
      }
    } catch (error) {
      return { message: "Erro interno do servidor", error: "INTERNAL_SERVER_ERROR" } as actionResponse<Data>;
    }
  };
};

const callAuthorization = async (): Promise<string> => {
  return "du3u4h5u4h5u4h65u45h4unrfuntun64u5nu3n4u4n34n3"
}

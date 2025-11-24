import { actionResponse } from "../contracts/types/responses.core";

type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  authToken?: string | null;
  isPublic?: boolean;
  raw?: boolean;
};

export function createFetcher<Payload = unknown, Data = unknown>(
  path: string,
  defaultOptions?: FetcherOptions
) {
  return async (
    payload?: Payload,
    options?: FetcherOptions
  ): Promise<any> => {

    const finalOptions = { ...defaultOptions, ...options };

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

    if (
      ["POST", "PUT", "PATCH"].includes(finalOptions.method ?? "POST") &&
      payload
    ) {
      // Format only for claudiFlare captcha 
      if (finalHeaders["Content-Type"] === "application/x-www-form-urlencoded") {
        body = new URLSearchParams(payload as Record<string, string>).toString();
      } else {
        body = JSON.stringify(payload);
      }
    }

    try {
      const response = await fetch(url, {
        method: finalOptions.method ?? "POST",
        headers: finalHeaders,
        body,
      });

      const json = await response.json();

      // =========================
      //     RETURN RAW MODE
      // =========================
      if (finalOptions.raw) {
        return json as Data;
      }

      // =========================
      //     RETURN API FORMAT
      // =========================
      if (!response.ok) {
        return {
          error: json.error ?? response.status,
          message: json.message ?? response.statusText,
          data: undefined,
        } satisfies actionResponse<Data>;
      }

      return {
        error: undefined,
        message: json.message,
        data: json.data,
      } satisfies actionResponse<Data>;

    } catch (error) {
      return {
        error: "INTERNAL_SERVER_ERROR",
        message: "Erro interno do servidor",
        data: undefined,
      } satisfies actionResponse<Data>;
    }
  };
}


const callAuthorization = async (): Promise<string> => {
  return "du3u4h5u4h5u4h65u45h4unrfuntun64u5nu3n4u4n34n3"
}

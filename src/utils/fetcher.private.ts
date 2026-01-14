"server-only";

import "server-only";
import { actionResponse } from "../contracts/types/responses.core";
import { config } from "../configs/config";

type FetcherOptions<Payload = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  next?: { revalidate: 0 };
  authToken?: string | null;
  isPublic?: boolean;
  raw?: boolean;
  credentials?: RequestCredentials;
  body?: Payload;
};

export function createPrivateFecher<Payload = unknown, Data = unknown>(
  path: string,
  defaultOptions?: FetcherOptions,
): {
  (
    payload?: Payload,
    options?: FetcherOptions & { raw?: false },
  ): Promise<actionResponse<Data>>;
  (payload?: Payload, options?: FetcherOptions & { raw: true }): Promise<Data>;
  (
    payload?: Payload,
    options?: FetcherOptions,
  ): Promise<actionResponse<Data> | Data>;
};
export function createPrivateFecher<Payload, Data>(
  path: string,
  defaultOptions?: FetcherOptions,
) {
  return async (payload?: Payload, options?: FetcherOptions) => {
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

    const baseUrl = config.getApiUrl();

    const url = isFullURL ? path : `${baseUrl}${path}`;

    let body: string | undefined = undefined;

    if (
      ["POST", "PUT", "PATCH"].includes(finalOptions.method ?? "POST") &&
      payload
    ) {
      if (
        finalHeaders["Content-Type"] === "application/x-www-form-urlencoded"
      ) {
        body = new URLSearchParams(
          payload as Record<string, string>,
        ).toString();
      } else {
        body = JSON.stringify(payload);
      }
    }

    try {
      const response = await fetch(url, {
        method: finalOptions.method ?? "POST",
        headers: finalHeaders,
        body: (finalOptions.body as BodyInit) ?? (body as BodyInit),
        credentials: finalOptions.credentials,
        next: finalOptions.next,
        cache: "no-cache",
      });
      const json = await response.json();

      if (finalOptions.raw) {
        // RAW → retorno puro Data
        return json as Data;
      }

      if (!response.ok) {
        return {
          error: json.error ?? response.status,
          message: json.message,
          data: undefined,
        } as actionResponse<Data>;
      }

      return {
        error: undefined,
        message: json.message,
        data: json.data ?? undefined,
      } as actionResponse<Data>;
    } catch (_error) {
      return {
        error: "INTERNAL_SERVER_ERROR",
        message: "Erro interno do servidor",
        data: undefined,
      } as actionResponse<Data>;
    }
  };
}

const callAuthorization = async (): Promise<string> => {
  const apiKey = process.env.API_SECRET_KEY;
  if (!apiKey) {
    throw new Error(
      "API_SECRET_KEY não está configurada nas variáveis de ambiente",
    );
  }
  return apiKey;
};

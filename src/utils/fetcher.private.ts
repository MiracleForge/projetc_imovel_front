"server-only"

import "server-only";
import { auth } from "@/auth";
import { actionResponse } from "../contracts/types/responses.core";

type FetcherOptions<Payload = any> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  next?: { revalidate: 0 },
  authToken?: string | null;
  isPublic?: boolean;
  raw?: boolean;
  credentials?: RequestCredentials
  body?: Payload;
};

export function createPrivateFecher<Payload = unknown, Data = unknown>(
  path: string,
  defaultOptions?: FetcherOptions
): {
  (payload?: Payload, options?: FetcherOptions & { raw?: false }): Promise<actionResponse<Data>>;
  (payload?: Payload, options?: FetcherOptions & { raw: true }): Promise<Data>;
  (payload?: Payload, options?: FetcherOptions): Promise<actionResponse<Data> | Data>;
};
export function createPrivateFecher<Payload, Data>(
  path: string,
  defaultOptions?: FetcherOptions
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
        body: finalOptions.body,
        credentials: finalOptions.credentials,
        next: finalOptions.next,
        cache: "no-cache"
      });
      console.log("fech")
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
    } catch (error) {
      return {
        error: "INTERNAL_SERVER_ERROR",
        message: "Erro interno do servidor",
        data: undefined,
      } as actionResponse<Data>;
    }
  };
}


const callAuthorization = async (): Promise<string> => {
  return "sk_19898bbec5782b5ddf6302d6a7515b55c2bdb0e49f2dfbd5"
}
async function getAuthenticatedUserBearer(): Promise<string | undefined> {
  const session = await auth();

  //TODO: ADD BAREAR TO THE SESSION AND GET HERE INSTAD OF ID
  return session?.user?.id ?? undefined;
}


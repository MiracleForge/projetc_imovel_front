import { actionResponse } from "../contracts/types/responses.core";

type FetcherOptions<Payload = any> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  next?: { revalidate: number };
  cache?: "no-cache" | "default" | "force-cache" | "reload";
  authToken?: string | null;
  isPublic?: boolean;
  raw?: boolean;
  credentials?: RequestCredentials;
  body?: Payload;
  debug?: boolean;
};

export function createPublicFetcher<Payload = unknown, Data = unknown>(
  path: string,
  defaultOptions?: FetcherOptions
): {
  (payload?: Payload, options?: FetcherOptions & { raw?: false }): Promise<actionResponse<Data>>;
  (payload?: Payload, options?: FetcherOptions & { raw: true }): Promise<Data>;
};

export function createPublicFetcher<Payload, Data>(
  path: string,
  defaultOptions?: FetcherOptions
) {
  return async (payload?: Payload, options?: FetcherOptions) => {
    const finalOptions: FetcherOptions = {
      method: defaultOptions?.method ?? "GET",
      raw: defaultOptions?.raw ?? false,
      isPublic: defaultOptions?.isPublic ?? false,
      debug: defaultOptions?.debug ?? false,
      headers: { ...(defaultOptions?.headers ?? {}) },
      ...defaultOptions,
      ...options,
    };

    const finalHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(finalOptions.headers ?? {}),
    };

    if (!finalOptions.isPublic && !path.startsWith("http")) {
      const accessToken = await callAuthorization();
      finalHeaders["Authorization"] = `Bearer ${accessToken}`;
    } else if (finalOptions.authToken) {
      finalHeaders["Authorization"] = `Bearer ${finalOptions.authToken}`;
    }

    // Body só para POST/PUT/PATCH
    const body =
      ["POST", "PUT", "PATCH"].includes(finalOptions.method ?? "GET") && payload
        ? JSON.stringify(payload)
        : undefined;

    const url =
      path.startsWith("http://") || path.startsWith("https://")
        ? path
        : `${process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_DEV : process.env.NEXT_PUBLIC_API_PROD}${path}`;

    if (finalOptions.debug) {
      console.log('🔍 Fetcher Debug:');
      console.log('  URL:', url);
      console.log('  Method:', finalOptions.method);
      console.log('  Headers:', finalHeaders);
      console.log('  Body:', body);
      console.log('  isPublic:', finalOptions.isPublic);
      console.log('  raw:', finalOptions.raw);
    }

    try {
      const response = await fetch(url, {
        method: finalOptions.method,
        headers: finalHeaders,
        body,
        credentials: finalOptions.credentials,
        next: finalOptions.next,
        cache: finalOptions.cache,
      });

      if (finalOptions.debug) {
        console.log('📡 Response Status:', response.status, response.statusText);
      }

      let json;
      try {
        json = await response.json();
      } catch (parseError) {
        const errorMsg = `Erro ao fazer parse do JSON da resposta (Status: ${response.status})`;
        console.error('❌', errorMsg, parseError);

        if (finalOptions.raw) {
          throw new Error(errorMsg);
        }

        return {
          error: "JSON_PARSE_ERROR",
          message: errorMsg,
          data: undefined,
        } as actionResponse<Data>;
      }

      if (finalOptions.debug) {
        console.log('📦 Response Body:', json);
      }

      // Retorno raw puro
      if (finalOptions.raw) return json as Data;

      // ✅ Retorno actionResponse com melhor tratamento de erro
      if (!response.ok) {
        const errorResponse = {
          error: json.error ?? `HTTP_${response.status}`,
          message: json.message ?? response.statusText ?? `Erro HTTP ${response.status}`,
          data: undefined,
        } as actionResponse<Data>;

        if (finalOptions.debug) {
          console.error('❌ Error Response:', errorResponse);
        }

        return errorResponse;
      }

      return {
        error: undefined,
        message: json.message,
        data: json.data ?? undefined,
      } as actionResponse<Data>;

    } catch (error) {
      // ✅ Melhor tratamento do catch
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      const errorDetails = {
        error: "FETCH_ERROR",
        message: `Erro na requisição: ${errorMessage}`,
        data: undefined,
        originalError: finalOptions.debug ? error : undefined, // Só expõe no debug
      } as actionResponse<Data>;

      console.error('❌ Fetch Error:', {
        url,
        method: finalOptions.method,
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined,
      });

      if (finalOptions.raw) {
        throw error; // Em modo raw, propaga o erro
      }

      return errorDetails;
    }
  };
}

const callAuthorization = async (): Promise<string> => {
  return "sk_19898bbec5782b5ddf6302d6a7515b55c2bdb0e49f2dfbd5";
};

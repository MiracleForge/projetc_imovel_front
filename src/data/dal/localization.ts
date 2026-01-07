"use server";

import "server-only";
import { cache } from "react";
import { cepServerSchema } from "@/src/contracts/DTOs/advertisement/cep.validation";
import { ViaCepResponse } from "@/src/contracts/DTOs/localization/localizationCep.response";
import { createPublicFetcher } from "@/src/utils/fetcher.public";

type CepResult =
  | { success: true; data: ViaCepResponse }
  | { success: false; error: string };

/**
 * Fetches address data by CEP (Brazilian postal code) from ViaCEP API.
 * This function is cached per request to avoid duplicate calls for the same CEP.
 *
 * @param cep - Brazilian postal code (with or without formatting)
 * @returns Address data or error message
 *
 * @example
 * const result = await getAddressByCEP("01310-100");
 * if (result.success) {
 *   console.log(result.data.logradouro);
 * }
 */
export const getAddressByCEP = cache(
  async (cep: string): Promise<CepResult> => {
    console.log("🟢 getAddressByCEP chamado", cep, new Date().toISOString());

    const cleanCep = cep.replace(/\D/g, "");
    const validatedCep = cepServerSchema.safeParse(cleanCep);

    if (!validatedCep.success) {
      return { success: false, error: "CEP inválido" };
    }

    const cepToFetch = validatedCep.data;

    try {
      const cepFetcher = createPublicFetcher<unknown, ViaCepResponse>(
        `https://viacep.com.br/ws/${cepToFetch}/json/`,
        {
          raw: true,
          method: "GET",
          isPublic: true,
          next: { revalidate: 3600 },
          cache: "force-cache",
        },
      );

      const data = await cepFetcher(undefined, { raw: true });

      if ("erro" in data && data.erro === "true") {
        return { success: false, error: "CEP não encontrado" };
      }

      return { success: true, data };
    } catch (error) {
      console.error("❌ Erro ao buscar CEP:", error);
      return {
        success: false,
        error: "Erro ao buscar CEP. Tente novamente.",
      };
    }
  },
);

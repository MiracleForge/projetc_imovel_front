"server-only"

import 'server-only';

import { turnsTilePayloadContract } from "../contracts/types/payloads.authentication";
import { actionResponse, TurnstileContract } from "../contracts/types/responses.core";
import { createFetcher } from "./fetchData";

export const validateTurnstileToken = async (
  token: string
): Promise<actionResponse<undefined> | void> => {

  const externalApiPath = process.env.VALIDATION_TOKEN_URL!;

  const validateCaptcha = createFetcher<
    turnsTilePayloadContract,
    TurnstileContract
  >(externalApiPath, {
    method: "POST",
    isPublic: true,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });

  const { data } = await validateCaptcha({
    response: token,
    secret: process.env.TURNSTILE_SECRET_KEY!
  });

  if (data?.success) return;

  return {
    error: "INVALID_CAPTCHA",
    message: data?.["error-codes"]?.join(", ") || "Captcha inválido."
  };

};


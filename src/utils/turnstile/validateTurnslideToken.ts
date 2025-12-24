"use server";

import "server-only";

import { turnsTilePayloadContract } from "../../contracts/types/payloads.authentication";
import { actionResponse, TurnstileContract } from "../../contracts/types/responses.core";
import { TurnstileTokenInvalid } from "@/src/errors/constructors/factory.error";
import { createPublicFetcher } from "../fetcher.public";

export const validateTurnstileToken = async (
  token: string
): Promise<actionResponse<undefined> | void> => {

  const externalApiPath = process.env.VALIDATION_TOKEN_URL!;

  const validateCaptcha = createPublicFetcher<
    turnsTilePayloadContract,
    TurnstileContract
  >(externalApiPath, {
    method: "POST",
    isPublic: true,
    raw: true,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });

  const captcha = await validateCaptcha({
    response: token,
    secret: process.env.TURNSTILE_SECRET_KEY!
  });

  if (!captcha?.error) return;

  return TurnstileTokenInvalid();

  // return {
  //   error: "INVALID_CAPTCHA",
  //   message: captcha?.["error-codes"]?.join(", ") || "Captcha inválido."
  // };
};


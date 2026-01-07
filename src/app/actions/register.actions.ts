"use server";

import { MissingTurnstileToken } from "@/src/errors/constructors/factory.error";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { createPublicFetcher } from "@/src/utils/fetcher.public";
import { getTurnstileToken } from "@/src/utils/turnstile/turnstile.utils";
import { registerPayload } from "@/src/contracts/types/user/payloads.types";
import { registerPayloadSchema } from "@/src/contracts/schemas/authentication/payloads.schemas";
import { validateFormData } from "@/src/utils/zod/validateFormData";
import { validateTurnstileToken } from "@/src/utils/turnstile/validateTurnslideToken";

export async function registerAction(
  _prevState: unknown,
  formData: FormData,
): Promise<actionResponse<undefined>> {
  const token = getTurnstileToken(formData);
  if (!token) return MissingTurnstileToken();

  const payloadValided = await validateFormData(
    formData,
    registerPayloadSchema,
  );
  if (!payloadValided.success) {
    return {
      error: payloadValided.error.error,
      message: payloadValided.error.message,
      data: undefined,
    };
  }

  await validateTurnstileToken(token);

  const path = "/auth/routes/access/register";
  const fetchRegister = createPublicFetcher<registerPayload, undefined>(path, {
    method: "POST",
  });

  return await fetchRegister(payloadValided.data);
}

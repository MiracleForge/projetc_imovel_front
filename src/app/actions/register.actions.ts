"use server";

import { registerPayloadSchema } from "@/src/contracts/schemas/authentication/payloads.schemas";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { registerPayload } from "@/src/contracts/types/user/payloads.types";
import { MissingTurnstileToken } from "@/src/errors/constructors/factory.error";
import { createFetcher } from "@/src/utils/fetchData";
import { getTurnstileToken } from "@/src/utils/turnstile/turnstile.utils";
import { validateTurnstileToken } from "@/src/utils/turnstile/validateTurnslideToken";
import { validateFormData } from "@/src/utils/zod/validateFormData";

export async function registerAction(_prevState: any, formData: FormData): Promise<actionResponse<undefined>> {

  const token = getTurnstileToken(formData);
  if (!token) return MissingTurnstileToken();

  const payloadValided = await validateFormData(formData, registerPayloadSchema);
  if (!payloadValided.success) {
    return payloadValided.error;
  }

  await validateTurnstileToken(token);

  const path = "/auth/routes/access/register";
  const fetchRegister = createFetcher<registerPayload, undefined>(path, { method: "POST" });

  return await fetchRegister(payloadValided.data);
}



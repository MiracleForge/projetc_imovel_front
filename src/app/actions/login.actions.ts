"use server";

import { loginSchema } from "@/src/contracts/schemas/authentication/payloads.schemas";
import { loginPayload } from "@/src/contracts/types/payloads.authentication";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { MissingTurnstileToken } from "@/src/errors/constructors/factory.error";
import { createFetcher } from "@/src/utils/fetchData";
import { getTurnstileToken } from "@/src/utils/turnstile/turnstile.utils";
import { validateTurnstileToken } from "@/src/utils/turnstile/validateTurnslideToken";
import { validateFormData } from "@/src/utils/zod/validateFormData";

export async function loginAction(_prevState: any, formData: FormData): Promise<actionResponse<undefined>> {
  const token = getTurnstileToken(formData);
  if (!token) return MissingTurnstileToken();

  const payloadValided = await validateFormData(formData, loginSchema);
  if (!payloadValided.success) {
    return payloadValided.error;
  }

  await validateTurnstileToken(token);

  const path = "/auth/login";
  const fetchLogin = createFetcher<loginPayload, undefined>(path, { method: "POST" });

  return await fetchLogin(payloadValided.data);
}

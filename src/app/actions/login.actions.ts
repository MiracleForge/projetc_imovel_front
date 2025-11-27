"use server";

import { loginSchema } from "@/src/contracts/schemas/authentication/payloads.schemas";
import { loginPayload } from "@/src/contracts/types/payloads.authentication";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { createFetcher } from "@/src/utils/fetchData";
import { validateTurnstileToken } from "@/src/utils/turnstile/validateTurnslideToken";
import { validateFormData } from "@/src/utils/zod/validateFormData";

export async function loginAction(_prevState: any, formData: FormData): Promise<actionResponse<undefined>> {
  const widgetToken = formData.get("cf-turnstile-response") as string | null;
  formData.delete("cf-turnstile-response");

  const payloadValided = await validateFormData(formData, loginSchema);
  if (!payloadValided.success) {
    return payloadValided.error;
  }

  await validateTurnstileToken(widgetToken!);

  const path = "/auth/login";
  const fetchLogin = createFetcher<loginPayload, undefined>(path, { method: "POST" });

  return await fetchLogin(payloadValided.data);
}

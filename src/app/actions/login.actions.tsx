"use server";

import { loginSchema } from "@/src/contracts/schemas/authentication/payloads.schemas";
import { loginPayload } from "@/src/contracts/types/payloads.authentication";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { createFetcher } from "@/src/utils/fetchData";
import { validateTurnstileToken } from "@/src/utils/validateTurnslideToken";
import { validateFormData } from "@/src/utils/zod/validateFormData";


export async function loginAction(_prevState: any, formData: FormData): Promise<actionResponse<undefined>> {
  const payloadValided = await validateFormData(formData, loginSchema);
  console.log(formData);
  if (!payloadValided.success) {
    return payloadValided.error;
  }

  // validating captcha
  const widgetToken = formData.get("cf-turnstile-response") as string | null;
  await validateTurnstileToken(widgetToken!);

  const path = "/auth/login";
  const fetchLogin = createFetcher<loginPayload, undefined>(path, { method: "POST" });

  await new Promise(r => setTimeout(r, 2000));
  return await fetchLogin(payloadValided.data);
}

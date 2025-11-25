"use server";

import { registerPayloadSchema } from "@/src/contracts/schemas/authentication/payloads.schemas";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { registerPayload } from "@/src/contracts/types/user/payloads.types";
import { createFetcher } from "@/src/utils/fetchData";
import { validateTurnstileToken } from "@/src/utils/validateTurnslideToken";
import { validateFormData } from "@/src/utils/zod/validateFormData";

export async function registerAction(_prevState: any, formData: FormData): Promise<actionResponse<undefined>> {

  const widgetToken = formData.get("cf-turnstile-response") as string | null;
  formData.delete("cf-turnstile-response");

  const payloadValided = await validateFormData(formData, registerPayloadSchema);
  if (!payloadValided.success) {
    return payloadValided.error;
  }

  await validateTurnstileToken(widgetToken!);

  const path = "/auth/register";
  const fetchRegister = createFetcher<registerPayload, undefined>(path, { method: "POST" });

  await new Promise(r => setTimeout(r, 2000));
  return await fetchRegister(payloadValided.data);
}

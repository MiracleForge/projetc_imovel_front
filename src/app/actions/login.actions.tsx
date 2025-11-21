"use server";

import { createFetcher } from "@/src/utils/fetchData";
import { actionResponse } from "@/src/schemasTypes/types/responses.core";
import { loginSchema } from "@/src/schemasTypes/schemas/authentication/payloads.schemas";
import { loginPayload } from "@/src/schemasTypes/types/payloads.authentication";
import { validateFormData } from "@/src/utils/zod/validateFormData";


export async function loginAction(_prevState: any, formData: FormData): Promise<actionResponse<undefined>> {
  const result = await validateFormData(formData, loginSchema);

  if (!result.success) {
    return result.error;
  }

  const path = "/auth/login";
  const fetchLogin = createFetcher<loginPayload, undefined>(path, { method: "POST" });

  await new Promise(r => setTimeout(r, 2000));
  return await fetchLogin(result.data);
}

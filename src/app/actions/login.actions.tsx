"use server";

import { createFetcher } from "@/src/utils/fetchData";
import { actionResponse } from "@/src/schemasTypes/types/responses.core";
import { loginSchema } from "@/src/schemasTypes/schemas/authentication/payloads.schemas";
import { loginPayload } from "@/src/schemasTypes/types/payloads.authentication";


export async function loginAction(_prevState: any, formData: FormData): Promise<actionResponse<undefined>> {
  const data = Object.fromEntries(formData.entries());
  const parsed = loginSchema.safeParse(
    data
  );

  if (!parsed.success) {
    return {
      message: parsed.error.issues.map(issue => issue.message).join(", "),
      error: parsed.error.issues.map(issue => issue.code).join(", ")
    };
  }

  const path = "/auth/login";
  const fetchLogin = createFetcher<loginPayload, undefined>(path, { method: "POST" });

  return await fetchLogin(parsed.data);
}


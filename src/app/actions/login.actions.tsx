"use server";


import { z } from "zod";
import { createFetcher } from "@/src/utils/fetchData";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

type loginPayload = z.infer<typeof loginSchema>;

type loginResponse = {
  message: string,
  payload: string
}

export type actionResponse = {
  message: string;
  error?: string;
  data?: unknown;
}

export async function loginAction(prevState: any, formData: FormData): Promise<actionResponse> {
  const parsed = loginSchema.safeParse({
    formData
  });

  if (!parsed.success) {
    return {
      message: "Credenciais inválidas",
      error: parsed.error.issues.map(issue => issue.message).join(", ")
    };
  }

  const link = "/auth/login";
  const fetchLogin = createFetcher<loginPayload, loginResponse>(link, { method: "POST" });

  const response = await fetchLogin(parsed.data);
  return {
    message: response.message,
    data: response.payload,
  }
}


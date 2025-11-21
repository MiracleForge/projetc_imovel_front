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

export async function loginAction(prevState: any, formData: FormData) {
  const parsed = loginSchema.safeParse({
    formData
  });

  if (!parsed.success) {
    return {
      errors: "Credenciais inválidas",
      issues: parsed.error.issues
    };
  }

  const link = "/auth/login";
  const fetchLogin = createFetcher<loginPayload, loginResponse>(link, { method: "POST" });

  return await fetchLogin(parsed.data);
}


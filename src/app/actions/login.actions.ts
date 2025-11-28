"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/src/contracts/schemas/authentication/payloads.schemas";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { MissingTurnstileToken } from "@/src/errors/constructors/factory.error";
import { getTurnstileToken } from "@/src/utils/turnstile/turnstile.utils";
import { validateTurnstileToken } from "@/src/utils/turnstile/validateTurnslideToken";

import { validateFormData } from "@/src/utils/zod/validateFormData";
import { redirect } from "next/navigation";

export async function loginAction(
  _prevState: any,
  formData: FormData
): Promise<actionResponse<string>> {
  const token = getTurnstileToken(formData);
  if (!token) return MissingTurnstileToken();

  const payloadValided = await validateFormData(formData, loginSchema);
  if (!payloadValided.success) {
    return payloadValided.error;
  }

  await validateTurnstileToken(token);

  try {
    const result = await signIn("credentials", {
      email: payloadValided.data.email,
      password: payloadValided.data.password,
      redirect: false,
      callbackUrl: "/",
    });

    console.log("signIn result:", result);

    if (result?.error) {
      return { message: "Email ou senha inválidos", error: "INVALID_CREDENTIALS" };
    }

    if (result?.url) return {
      message: "Autenticado com sucesso. Redirecionando",
      data: result.url,
      error: undefined
    };
    return { message: "Erro desconhecido", error: "LOGIN_ERROR" };
  } catch (error: any) {
    return {
      message: error.message || "Erro ao fazer login",
      error: "LOGIN_EXCEPTION",
    };
  }
}


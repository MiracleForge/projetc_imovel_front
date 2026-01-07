"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/src/contracts/schemas/authentication/payloads.schemas";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { MissingTurnstileToken } from "@/src/errors/constructors/factory.error";
import { getTurnstileToken } from "@/src/utils/turnstile/turnstile.utils";
import { validateTurnstileToken } from "@/src/utils/turnstile/validateTurnslideToken";
import { validateFormData } from "@/src/utils/zod/validateFormData";

export async function loginAction(
  _prevState: unknown,
  formData: FormData,
): Promise<actionResponse<string>> {
  const token = getTurnstileToken(formData);
  if (!token) return MissingTurnstileToken();

  const payloadValided = await validateFormData(formData, loginSchema);
  if (!payloadValided.success) {
    return {
      error: payloadValided.error.error,
      message: payloadValided.error.message,
      data: undefined,
    };
  }

  await validateTurnstileToken(token);

  try {
    await signIn("credentials", {
      email: payloadValided.data.email,
      password: payloadValided.data.password,
      redirect: false,
      callbackUrl: "/",
    });

    return {
      message: "Autenticado com sucesso! Redirecionando...",
      data: "/",
      error: undefined,
    };
  } catch (error: unknown) {
    return {
      message: error instanceof Error ? error.message : "Erro ao fazer login",
      error: "LOGIN_EXCEPTION",
      data: undefined,
    };
  }
}

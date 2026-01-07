"use client";

import dynamic from "next/dynamic";
import { useActionState, useEffect } from "react";
import Link from "next/link";
import { loginAction } from "@/src/app/actions/login.actions";
import { SocialAuthButton } from "@/src/components/ui/buttons/SocialAuth.button";
import { initialState } from "@/src/contracts/types/responses.core";
import SubmitButton from "@/src/components/ui/buttons/StepButton.button";
import CommumInput from "@/src/components/ui/inputs/Commum.inputs";
import { redirect } from "next/navigation";
import { config } from "@/src/data/config";
const TurnstileWidget = dynamic(
  () => import("@/src/components/layouts/captchas/TurnstileWidget.layout"),
  { ssr: false },
);

export default function Page() {
  const [state, formAction] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.data === "/") {
      // TODO: CORRIGIR ISSO NO FUTURO, PASSAR A CALLBACK URL AO INVES DE UM VALOR FIXO
      redirect("/");
    }
  }, [state.data]);

  return (
    <div className="pb-6">
      <form action={formAction} className="gap-px">
        <CommumInput
          topLabel="Email"
          type="email"
          name="email"
          autoComplete="on"
          placeholder="exemplo@email.com"
          required
        />
        <CommumInput
          topLabel="Senha"
          type="password"
          name="password"
          autoComplete="off"
          placeholder=""
          required
        />

        {state?.error && (
          <p className="text-red-500 text-sm pt-0.5">{state.message}</p>
        )}

        <div className="mt-5 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="remember"
              className="outline-none focus:outline focus:outline-sky-300"
            />
            <span className="text-sm font-normal">Continuar conectado</span>
          </label>

          <Link
            className="text-[10px] font-extralight link-default"
            href="/forgot-password"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <div className="pt-3 -translate-x-1.5">
          <TurnstileWidget
            key={"login-captcha"}
            siteKey={config.turnstile.siteKey}
          />
        </div>

        <SubmitButton type="submit">Entrar</SubmitButton>
      </form>

      <p className="text-sm font-medium text-[#0061A7] py-2">ou</p>

      <SocialAuthButton />
    </div>
  );
}

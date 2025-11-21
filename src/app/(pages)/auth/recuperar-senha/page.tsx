'use client';

import { SocialAuthButton } from "@/src/components/ui/buttons/SocialAuth.button";
import CommumInput from "@/src/components/ui/imputs/Commum.inputs";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { loginAction } from "@/src/app/actions/login.actions";
import { initialState } from "@/src/schemasTypes/types/responses.core";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full mt-2 h-12 font-medium hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center text-xl bg-black text-white px-4 py-2 disabled:pointer-events-none disabled:opacity-50"
      type="submit"
    >
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}

export default function Page() {
  const [state, formAction] = useActionState(loginAction, initialState);
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

        {state.message &&
          <p className="text-red-500 text-sm pt-0.5">{state.message}</p>
        }

        <div className="mt-5 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="remember"
              className="outline-none focus:outline focus:outline-sky-300"
            />
            <span className="text-sm font-normal">Continuar conectado</span>
          </label>

          <a className="text-[10px] font-extralight link-default" href="/forgot-password">
            Esqueceu sua senha?
          </a>
        </div>

        <SubmitButton />
      </form>

      <p className="text-sm font-medium text-[#0061A7] py-2">ou</p>

      <SocialAuthButton action="login" />

    </div>
  );
}


'use client';

import { useActionState } from "react";
import { SocialAuthButton } from "@/src/components/ui/buttons/SocialAuth.button";
import CommumInput from "@/src/components/ui/imputs/Commum.inputs";
import { loginAction } from "@/src/app/actions/login.actions";
import SubmitButton from "@/src/components/ui/buttons/Submit.button";
import { initialState } from "@/src/schemasTypes/types/responses.core";

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

        <CommumInput
          topLabel="Confirmar Senha"
          type="password"
          name="password"
          autoComplete="off"
          placeholder=""
          required
        />


        {state.message &&
          <p className="text-red-500 text-sm pt-0.5">{state.message}</p>
        }

        <SubmitButton text="Cadastrar" type="submit" />
      </form>

      <p className="text-sm font-medium text-[#0061A7] py-2">ou</p>

      <SocialAuthButton action="register" />

    </div>
  );
}


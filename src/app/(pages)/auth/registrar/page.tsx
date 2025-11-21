'use client';

import { useActionState, useState } from "react";
import { SocialAuthButton } from "@/src/components/ui/buttons/SocialAuth.button";
import CommumInput from "@/src/components/ui/imputs/Commum.inputs";
import { loginAction } from "@/src/app/actions/login.actions";
import SubmitButton from "@/src/components/ui/buttons/Submit.button";
import { initialState } from "@/src/schemasTypes/types/responses.core";
import { registerSteps } from "./steps";

export default function Page() {
  const [state, formAction] = useActionState(loginAction, initialState);
  const [step, setStep] = useState(0);

  const currentStep = registerSteps[step];
  const lastStep = step === registerSteps.length - 1;

  function nextStep() {
    if (!lastStep) setStep(step + 1);
  }
  function prevStep() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <div className="pb-6">

      <form action={formAction} className="gap-px">

        <h2 className="text-lg font-semibold">{currentStep.title}</h2>

        {currentStep.fields.map(field => (
          <CommumInput
            key={field.name}
            {...field}
          />
        ))}

        {state.message &&
          <p className="text-red-500 text-sm pt-0.5">{state.message}</p>
        }

        <div className={`flex justify-between pt-3 ${step > 0 || lastStep ? "space-x-3" : ""}`}>
          {step > 0 ? (
            <SubmitButton text="Voltar" type="button" onClick={prevStep} />
          ) : <span />}

          {!lastStep ? (

            <SubmitButton text="Avançar" type="button" onClick={nextStep} />
          ) : null}

          {lastStep && (
            <SubmitButton text="Cadastrar" type="submit" />
          )}
        </div>


      </form>

      <p className="text-sm font-medium text-[#0061A7] py-2">ou</p>

      <SocialAuthButton action="register" />

    </div>
  );
}


"use client";

import { useActionState, useState, useCallback, useMemo } from "react";
import { SocialAuthButton } from "@/src/components/ui/buttons/SocialAuth.button";
import CommumInput from "@/src/components/ui/imputs/Commum.inputs";
import SubmitButton from "@/src/components/ui/buttons/Submit.button";
import { registerSteps } from "./steps";
import { initialState } from "@/src/contracts/types/responses.core";

import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";
import dynamic from "next/dynamic";
import { registerAction } from "@/src/app/actions/register.actions";
const TurnstileWidget = dynamic(
  () => import('@/src/components/layouts/captchas/TurnstileWidget.layout'),
  { ssr: false }
);

export default function Page() {
  const [state, formAction] = useActionState(registerAction, initialState);
  const [step, setStep] = useState(0);
  const lastStep = useMemo(() => step === registerSteps.length - 1, [step]);
  const totalSteps = useMemo(() => registerSteps.length, []);

  const nextStep = useCallback(() => {
    setStep(prev => (prev < registerSteps.length - 1 ? prev + 1 : prev));
  }, []);

  const prevStep = useCallback(() => {
    setStep(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={totalSteps} currentStep={step} />

      <form action={formAction} className="gap-px">
        {registerSteps.map((stepData, index) => (
          <div key={index} style={{ display: step === index ? 'block' : 'none' }}>
            <h2 className="text-lg font-semibold">{stepData.title}</h2>
            {stepData.fields.map(field => (
              <CommumInput key={field.name} {...field} />
            ))}
          </div>
        ))}

        {lastStep && (
          <div className="pt-3 -translate-x-1.5">
            <TurnstileWidget
              key="register-captcha"
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            />
          </div>
        )}

        {state.message && (
          <p className={`${state.error && "text-red-500"} text-sm pt-0.5`}>{state.message}</p>
        )}

        <StepNavigation
          step={step}
          lastStep={lastStep}
          onNext={nextStep}
          onPrev={prevStep}
        />
      </form>

      {!lastStep && (
        <>
          <p className="text-sm font-medium text-[#0061A7]">ou</p>
          <SocialAuthButton />
        </>
      )}
    </div>
  );
}

interface StepNavigationProps {
  step: number;
  lastStep: boolean;
  onNext: () => void;
  onPrev: () => void;
}

function StepNavigation({ step, lastStep, onNext, onPrev }: StepNavigationProps) {
  return (
    <div className={`flex justify-between pt-3 ${step > 0 || lastStep ? "space-x-3" : ""}`}>
      {step > 0 ? (
        <SubmitButton text="Voltar" type="button" onClick={onPrev} />
      ) : (
        <span />
      )}

      {!lastStep ? (
        <SubmitButton text="Avançar" type="button" onClick={onNext} />
      ) : null}

      {lastStep && <SubmitButton text="Cadastrar" type="submit" />}
    </div>
  );
}

"use client"

import { useRouter } from "next/navigation";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { useTransition } from "react";
import LoadingSpinner from "../ui/spinners/LoadingSpinner.ui";
import StepButton from "../ui/buttons/StepButton.button";

interface FormProps {
  children: React.ReactNode;
  onNext?: () => boolean | Promise<boolean>;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
  nextRoute?: string;
  prevRoute?: string;
}

export function Form({
  children,
  onNext,
  onPrev,
  currentStep,
  totalSteps,
  nextRoute,
  prevRoute,
}: FormProps) {
  const router = useRouter();
  const { setCurrentStep } = useAdvertisementFormStore();
  const [isPending, startTransition] = useTransition();

  const handleNext = async () => {
    let canProceed = true;

    if (onNext) {
      canProceed = await onNext();
    }

    if (canProceed && nextRoute) {
      startTransition(() => {
        setCurrentStep(currentStep + 1);
        router.push(nextRoute);
      });
    }
  };

  const handlePrev = () => {
    if (onPrev) onPrev();

    if (prevRoute) {
      startTransition(() => {
        setCurrentStep(currentStep - 1);
        router.push(prevRoute);
      });
    }
  };

  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="space-y-3 relative">
      {isPending && <LoadingSpinner text="Carregando..." />}

      {children}

      <div className="flex justify-between gap-4 pt-4">
        <StepButton
          onClick={handlePrev}
          disabled={isFirstStep || isPending}
        >
          Voltar
        </StepButton>

        {!isLastStep && (
          <StepButton
            onClick={handleNext}
            variant="primary"
            loading={isPending}
          >
            Próximo
          </StepButton>
        )}
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";

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

  const handleNext = async () => {
    let canProceed = true;

    if (onNext) {
      canProceed = await onNext();
    }

    if (canProceed && nextRoute) {
      setCurrentStep(currentStep + 1);
      router.push(nextRoute);
    }
  };

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    }

    if (prevRoute) {
      setCurrentStep(currentStep - 1);
      router.push(prevRoute);
    }
  };

  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="space-y-3">
      {children}

      <div className="flex justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isFirstStep}
          className={`h-12 font-medium transition duration-300 inline-flex items-center justify-center text-xl px-6 py-2 ${
            isFirstStep
              ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none opacity-50"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:ring hover:ring-gray-400 cursor-pointer"
          }`}
        >
          Voltar
        </button>

        {!isLastStep && (
          <button
            type="button"
            onClick={handleNext}
            className="h-12 font-medium hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center text-xl bg-black text-white px-6 py-2 cursor-pointer"
          >
            Próximo
          </button>
        )}
      </div>
    </div>
  );
}

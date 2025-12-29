"use client";

import { useRouter } from "next/navigation";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { useState } from "react";

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
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNext = async () => {
    let canProceed = true;

    if (onNext) {
      canProceed = await onNext();
    }

    if (canProceed && nextRoute) {
      setIsNavigating(true);
      setCurrentStep(currentStep + 1);
      router.push(nextRoute);
    }
  };

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    }

    if (prevRoute) {
      setIsNavigating(true);
      setCurrentStep(currentStep - 1);
      router.push(prevRoute);
    }
  };

  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="space-y-3 relative">
      {/* Loading overlay */}
      {isNavigating && (
        <div className="absolute inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <span className="text-sm text-gray-600">Carregando...</span>
          </div>
        </div>
      )}

      {children}

      <div className="flex justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isFirstStep || isNavigating}
          className={`h-12 font-medium transition duration-300 inline-flex items-center justify-center text-xl px-6 py-2 ${isFirstStep || isNavigating
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
            disabled={isNavigating}
            className={`h-12 font-medium transition duration-300 inline-flex items-center justify-center text-xl px-6 py-2 ${isNavigating
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-black hover:ring hover:ring-white cursor-pointer"
              }`}
          >
            {isNavigating ? "Carregando..." : "Próximo"}
          </button>
        )}
      </div>
    </div>
  );
}

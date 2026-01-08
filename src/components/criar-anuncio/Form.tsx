"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { useTransition, useActionState, useState, useEffect } from "react";
import {
  actionResponse,
  initialState,
} from "@/src/contracts/types/responses.core";
import { serializeAdvertisement } from "@/src/utils/serialization/serializeAdvertisement.utils";
import LoadingSpinner from "../ui/spinners/LoadingSpinner.ui";
import StepButton from "../ui/buttons/StepButton.button";
import StepField from "../wrappers/StepField.wrapper";
import {
  useStepValidation,
  ValidationError,
} from "@/src/hooks/useStepValidation";
import {
  stepSchemas,
  StepNumber,
} from "@/src/contracts/DTOs/advertisement/advertisement.steps.dto";

const PricingStepModal = dynamic(
  () => import("@/src/components/layouts/Modals/PricingStep.modal"),
  { ssr: false },
);

interface FormProps {
  children: React.ReactNode;
  onNext?: () => boolean | Promise<boolean>;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
  nextRoute?: string;
  prevRoute?: string;
  label?: string;
  submitAction?: (
    prevState: actionResponse,
    formData: FormData,
  ) => Promise<actionResponse<undefined>>;
}

export function Form({
  children,
  onNext,
  onPrev,
  currentStep,
  totalSteps,
  nextRoute,
  prevRoute,
  label,
  submitAction,
}: FormProps) {
  const router = useRouter();
  const { setCurrentStep, formData, resetForm } = useAdvertisementFormStore();
  const [isPending, startTransition] = useTransition();
  const { errors, validateStep, clearErrors } = useStepValidation();

  // Submit state (only for last step)
  const [openModal, setOpenModal] = useState(false);
  const [state, formAction] = useActionState(
    submitAction || (async () => initialState),
    initialState,
  );

  const handleNext = async () => {
    // Validate current step using stepSchemas
    const schema = stepSchemas[currentStep as StepNumber];

    if (schema) {
      const isValid = validateStep(formData, schema);
      if (!isValid) {
        return; // Don't proceed if validation fails
      }
    }

    let canProceed = true;

    if (onNext) {
      canProceed = await onNext();
    }

    if (canProceed && nextRoute) {
      clearErrors(); // Clear errors before navigating
      startTransition(() => {
        setCurrentStep(currentStep + 1);
        router.push(nextRoute);
      });
    }
  };

  const handlePrev = () => {
    clearErrors(); // Clear errors when going back

    if (onPrev) onPrev();

    if (prevRoute) {
      startTransition(() => {
        setCurrentStep(currentStep - 1);
        router.push(prevRoute);
      });
    }
  };

  const handleSubmit = () => {
    const fd = serializeAdvertisement(formData);
    startTransition(() => {
      formAction(fd);
    });
  };

  useEffect(() => {
    if (state.data && !state.error) {
      resetForm();
    }
  }, [state.data, state.error, resetForm]);

  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  // Combine validation errors and submission errors
  const allErrors = [
    ...errors,
    ...(state.error && state.message
      ? state.message.split("\n").map((msg: string) => ({
          field: "submit",
          message: msg,
        }))
      : []),
  ];

  const content = (
    <div className="space-y-3 relative">
      {isPending && <LoadingSpinner text="Carregando..." />}

      {isLastStep && submitAction && (
        <PricingStepModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      {children}

      {allErrors.length > 0 && <ErrorList errors={allErrors} />}

      <div className="flex justify-between gap-4 pt-4">
        <StepButton
          onClick={handlePrev}
          disabled={isFirstStep || isPending}
          type="button"
        >
          Voltar
        </StepButton>

        {isLastStep && submitAction ? (
          <StepButton
            onClick={() => setOpenModal(true)}
            variant="primary"
            loading={isPending}
            type="button"
          >
            Publicar Anúncio
          </StepButton>
        ) : !isLastStep ? (
          <StepButton
            onClick={handleNext}
            variant="primary"
            loading={isPending}
            type="button"
          >
            Próximo
          </StepButton>
        ) : null}
      </div>
    </div>
  );

  return label ? <StepField label={label}>{content}</StepField> : content;
}

// Error List Component
function ErrorList({ errors }: { errors: ValidationError[] }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
      <div className="flex items-start gap-2">
        <svg
          className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-red-800 mb-1">
            {errors.length === 1
              ? "Corrija o erro abaixo:"
              : `Corrija os ${errors.length} erros abaixo:`}
          </h4>
          <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
            {errors.map((error, idx) => (
              <li key={idx}>{error.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";

import ErrorList from "../ui/Errors/ErrorList.ui";
import LoadingSpinner from "../ui/spinners/LoadingSpinner.ui";
import StepButton from "../ui/buttons/StepButton.button";
import StepField from "../wrappers/StepField.wrapper";
import dynamic from "next/dynamic";
import { actionResponse, initialState } from "@/src/contracts/types/responses.core";
import { serializeAdvertisement } from "@/src/utils/serialization/serializeAdvertisement.utils";
import { stepSchemas, StepNumber } from "@/src/contracts/DTOs/advertisement/advertisement.steps.dto";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { useRouter } from "next/navigation";
import { useStepValidation } from "@/src/hooks/useStepValidation";
import { useTransition, useActionState, useState, useEffect } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, formAction] = useActionState(
    submitAction || (async () => initialState),
    initialState,
  );

  const handleNext = async () => {
    const schema = stepSchemas[currentStep as StepNumber];

    if (schema) {
      const isValid = validateStep(formData, schema);
      if (!isValid) {
        return;
      }
    }

    let canProceed = true;

    if (onNext) {
      canProceed = await onNext();
    }

    if (canProceed && nextRoute) {
      clearErrors();
      startTransition(() => {
        setCurrentStep(currentStep + 1);
        router.push(nextRoute);
      });
    }
  };

  const handlePrev = () => {
    clearErrors();

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

  const handlePublishClick = () => {
    if (formData.promotion === null) {
      setIsModalOpen(true);
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (state.data && !state.error) {
      resetForm();
      setIsModalOpen(false);
    }
  }, [state.data, state.error, resetForm]);

  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

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
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
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
            onClick={handlePublishClick}
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

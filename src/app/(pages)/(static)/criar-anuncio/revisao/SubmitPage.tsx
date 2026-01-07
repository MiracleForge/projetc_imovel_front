"use client";

import dynamic from "next/dynamic";
import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ReviewStep } from "@/src/components/criar-anuncio/ReviewStep";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { actionResponse, initialState } from "@/src/contracts/types/responses.core";
import StepField from "@/src/components/wrappers/StepField.wrapper";
import { useEffect } from "react";
import { serializeAdvertisement } from "@/src/utils/serialization/serializeAdvertisement.utils";
import StepButton from "@/src/components/ui/buttons/StepButton.button";


const PricingStepModal = dynamic(
  () => import("@/src/components/layouts/Modals/PricingStep.modal"),
  {
    ssr: false,
  }
);


interface SubmitPageProps {
  submitAction: (
    prevState: actionResponse,
    formData: FormData,
  ) => Promise<actionResponse<undefined>>;
}

export function SubmitPage({ submitAction }: SubmitPageProps) {
  const router = useRouter();
  const { formData, resetForm } = useAdvertisementFormStore();
  const [openModal, setOpenModal] = useState(false);
  const [state, formAction] = useActionState(submitAction, initialState);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (state.data && !state.error) {
      resetForm();
    }
  }, [state.data, state.error, resetForm]);



  const handleSubmit = () => {
    const fd = serializeAdvertisement(formData);

    startTransition(() => {
      formAction(fd);
    });
  };

  return (
    <StepField label="Revisão">

      <form onSubmit={(e) => { e.preventDefault(); setOpenModal(true) }}>

        <PricingStepModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleSubmit}
        />

        <ReviewStep />

        {state.error && (
          <ul className="text-red-500 text-sm pt-0.5 list-disc list-inside mt-4">
            {state.message?.split("\n").map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}

        <div className="flex justify-between items-center gap-4 pt-4">
          <StepButton
            onClick={() => router.push("/criar-anuncio/opcoes")}
          >
            Voltar
          </StepButton>

          <StepButton
            type="submit"
            variant="primary"
          >
            Publicar Anúncio
          </StepButton>

        </div>
      </form>
    </StepField>
  );
}


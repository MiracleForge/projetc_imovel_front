"use client";

import { useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ReviewStep } from "@/src/components/criar-anuncio/ReviewStep";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { actionResponse, initialState } from "@/src/contracts/types/responses.core";
import SubmitButton from "@/src/components/ui/buttons/StepButton.button";
import StepField from "@/src/components/wrappers/StepField.wrapper";
import { useEffect } from "react";
import { serializeAdvertisement } from "@/src/utils/serialization/serializeAdvertisement.utils";
import StepButton from "@/src/components/ui/buttons/StepButton.button";

interface SubmitPageProps {
  submitAction: (
    prevState: actionResponse,
    formData: FormData,
  ) => Promise<actionResponse<undefined>>;
}

export function SubmitPage({ submitAction }: SubmitPageProps) {
  const router = useRouter();
  const { formData, resetForm } = useAdvertisementFormStore();

  const [state, formAction] = useActionState(submitAction, initialState);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (state.data && !state.error) {
      resetForm();
    }
  }, [state.data, state.error, resetForm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = serializeAdvertisement(formData);

    startTransition(() => {
      formAction(fd);
    });
  };

  return (
    <StepField label="Revisão">
      <form onSubmit={handleSubmit}>
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


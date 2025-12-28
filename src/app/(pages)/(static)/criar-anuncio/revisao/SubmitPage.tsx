"use client";

import { useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ReviewStep } from "@/src/components/criar-anuncio/ReviewStep";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import {
  actionResponse,
  initialState,
} from "@/src/contracts/types/responses.core";
import { useEffect } from "react";
import SubmitButton from "@/src/components/ui/buttons/Submit.button";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Add all form fields to FormData
    if (formData.category) {
      formDataToSend.append("category", formData.category);
    }
    formDataToSend.append("title", formData.title || "");
    formDataToSend.append("subTitle", formData.subTitle || "");
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("price", formData.price?.toString() || "0");
    formDataToSend.append("transactionMode", formData.transactionMode || "");
    formDataToSend.append("phone", formData.phone || "");
    formDataToSend.append("whatsapp", formData.whatsapp || "");

    // Add address fields
    if (formData.address) {
      Object.entries(formData.address).forEach(([key, value]) => {
        formDataToSend.append(`address.${key}`, value);
      });
    }

    // Add property metrics
    if (formData.options?.propertyMetrics) {
      Object.entries(formData.options.propertyMetrics).forEach(
        ([key, value]) => {
          formDataToSend.append(
            `options.propertyMetrics.${key}`,
            value.toString(),
          );
        },
      );
    }

    // Add amenities
    if (formData.options?.amenities) {
      Object.entries(formData.options.amenities).forEach(([key, value]) => {
        formDataToSend.append(`options.amenities.${key}`, value.toString());
      });
    }

    // Add condominion options
    if (formData.options?.condominion) {
      Object.entries(formData.options.condominion).forEach(([key, value]) => {
        formDataToSend.append(`options.condominion.${key}`, value.toString());
      });
    }

    // Add image files directly from store
    formData.imagesFiles.forEach((file) => {
      formDataToSend.append("imagesFiles", file);
    });

    // Call the server action inside a transition
    startTransition(() => {
      formAction(formDataToSend);
    });
  };

  useEffect(() => {
    if (state.data !== undefined && !state.error) {
      resetForm();
    }
  }, [state.data, state.error, resetForm]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Images via ReviewStep */}
        <ReviewStep />

        {state.error && (
          <ul className="text-red-500 text-sm pt-0.5 list-disc list-inside mt-4">
            {state.message?.split("\n").map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}

        <div className="flex justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.push("/criar-anuncio/caracteristicas")}
            className="h-12 font-medium transition duration-300 inline-flex items-center justify-center text-xl px-6 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 hover:ring hover:ring-gray-400 cursor-pointer"
          >
            Voltar
          </button>

          <SubmitButton
            type="submit"
            text="Publicar Anúncio"
            pendingText="Enviando..."
          />
        </div>
      </form>
    </div>
  );
}

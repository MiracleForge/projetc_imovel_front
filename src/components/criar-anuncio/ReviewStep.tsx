"use client";

import { useMemo } from "react";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import ImageUploadSection from "../layouts/Previews/ImageUploudSection.preview";

interface SummaryData {
  category: string;
  title: string;
  location: string;
  transaction: string;
  price: string;
}

export function ReviewStep() {
  const { formData, updateField } = useAdvertisementFormStore();

  const summary = useMemo<SummaryData>(
    () => ({
      category: formData.category ?? "",
      title: formData.title ?? "",
      location:
        formData.address?.city && formData.address?.state
          ? `${formData.address.city}, ${formData.address.state}`
          : "",
      transaction: formData.transactionMode ?? "",
      price: formData.price ? `R$ ${formData.price}` : "Não informado",
    }),
    [formData]
  );

  return (
    <section className="mt-6 p-5 rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-white shadow-sm space-y-6">
      <ImageUploadSection
        files={formData.imagesFiles ?? []}
        onChange={(files) => updateField("imagesFiles", files)}
      />

      <div className="pt-4 border-t border-gray-200">
        <SummaryCard summary={summary} />
      </div>
    </section>
  );
}

const SummaryCard = ({ summary }: { summary: SummaryData }) => (
  <section aria-labelledby="summary-title">
    <h3
      id="summary-title"
      className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4"
    >
      <img src="/logos/imobly-logo.svg" className="w-5 h-5" alt="Imobly" />
      Resumo do Imóvel
    </h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
      <SummaryItem label="Categoria" value={summary.category} />
      <SummaryItem label="Título do anúncio" value={summary.title} />
      <SummaryItem label="Localização" value={summary.location} />
      <SummaryItem label="Tipo de Transação" value={summary.transaction} />
    </div>

    <div className="mt-4 p-3 bg-blue-100 rounded-lg text-center">
      <p className="text-xs text-blue-700">Preço estimado</p>
      <p className="text-xl font-bold text-blue-900">{summary.price}</p>
    </div>
  </section>
);

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value || "Não informado"}</p>
  </div>
);


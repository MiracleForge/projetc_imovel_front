"use client";

import { useState } from "react";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import ImageUploadSection from "../layouts/Previews/ImageUploudSection.preview";
import PreviewAdvertiserSection from "../layouts/Previews/PreviewAdvertiserSection";
import { useAdvertiserSummary } from "@/src/hooks/formatter/UseAdversitmentFormatter.hook";
import { HelperText } from "../ui/separatores/FormSeparator.ui";
import PricingStepModal from "../layouts/Modals/PricingStep.modal";

export function ReviewStep() {
  const { formData, updateField } = useAdvertisementFormStore();
  const summaryPreview = useAdvertiserSummary(formData);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  return (
    <>
      <HelperText text="Você está quase lá! Adicione imagens, escolha seu plano e revise o anúncio antes de publicar" />
      <section className="mt-6 p-5 rounded-2xl border bg-linear-to-br from-blue-50 to-white space-y-6">
        <ImageUploadSection
          files={formData.imagesFiles ?? []}
          onChange={(files) => updateField("imagesFiles", files)}
        />
        <PreviewAdvertiserSection
          summary={summaryPreview}
          onEditPlan={() => setIsPricingOpen(true)}
        />
      </section>

      <PricingStepModal
        open={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onSubmit={() => setIsPricingOpen(false)}
      />
    </>
  );
}

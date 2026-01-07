"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { useState } from "react";
import { pricingPlans } from "@/src/data/pricing.data";
import PricingCard from "../../ui/cards/Pricing.card.ui";

interface PricingStepModal {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function PricingStepModal({
  open,
  onClose,
  onSubmit
}: PricingStepModal) {
  const { formData, updateField } = useAdvertisementFormStore();
  const [selected, setSelected] = useState(formData.promotion || "free");

  if (!open) return null;

  const handleSelect = (value: "free" | "highlighted" | "studio") => {
    setSelected(value);
    updateField("promotion", value);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promotion-modal-title"
      className="fixed inset-0 z-9999 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <div className="relative bg-white md:rounded-3xl w-xl lg:w-360 md:p-10 overflow-y-auto md:max-h-[90vh] shadow-2xl">
        <h2 id="promotion-modal-title" className="sr-only">
          Escolha o plano de destaque do anúncio
        </h2>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 px-6 py-3">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.variant}
              variant={plan.variant}
              selected={selected === plan.variant}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              originalPrice={plan.originalPrice}
              discount={plan.discount}
              period={plan.period}
              badge={plan.badge}
              features={plan.features}
              bottomBadge={plan.bottomBadge}
              icon={plan.icon}
              onSelect={() => handleSelect(plan.variant)}
            />
          ))}
        </section>

        <footer className="flex justify-end mt-10 px-6">
          <button
            type="button"
            onClick={() => {
              onSubmit();
              onClose();
            }}
            className="px-6 py-3 rounded-xl bg-secundary-blue hover:bg-blue-700 text-white font-semibold shadow-lg transition"
          >
            Continuar
          </button>
        </footer>
      </div>
    </div>
  );
}


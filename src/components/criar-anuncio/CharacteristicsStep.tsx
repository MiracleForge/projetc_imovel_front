"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { InputNumeric } from "@/src/components/ui/inputs/InputNumeric.ui";
import { metricsIconsMap } from "@/src/data/global.constants";
import FormField from "../wrappers/FormField.wrapper";
import StepField from "../wrappers/StepField.wrapper";

const OPTIONS_METRICS = [
  ["area", "Área"],
  ["rooms", "Quartos"],
  ["bathrooms", "Banheiros"],
  ["garage", "Vagas garagem"],
] as const;

export function CharacteristicsStep() {
  const { formData, updateField } = useAdvertisementFormStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, Number(value));
  };

  return (
    <StepField label="Características do Imóvel">
      <FormField label="Características do Imóvel">
        <div className="flex flex-col gap-4">
          {OPTIONS_METRICS
            .filter(([key]) =>
              formData.category === "terrenos-sítios" ? key === "area" : true
            )
            .map(([key, label]) => (
              <InputNumeric
                key={key}
                id={`metric-${key}`}
                label={label}
                iconKey={key}
                iconsMap={metricsIconsMap}
                required={key === "area"}
                min={0}
                inputMode="numeric"
                name={`options.propertyMetrics.${key}`}
                value={formData.options.propertyMetrics[key] ?? 0}
                onChange={handleInputChange}
              />
            ))}
        </div>
      </FormField>
    </StepField>
  );
}

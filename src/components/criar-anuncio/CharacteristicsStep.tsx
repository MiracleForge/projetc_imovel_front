"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { InputNumeric } from "@/src/components/ui/inputs/InputNumeric.ui";
import FormField from "../wrappers/FormField.wrapper";
import StepField from "../wrappers/StepField.wrapper";
import { propertyMetricsConfig } from "@/src/content/adversetiment.content";

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
          {propertyMetricsConfig
            .filter(({ field }) =>
              formData.category === "terrenos-sítios"
                ? field === "area"
                : true
            )
            .map(({ field, label, icon }) => (
              <InputNumeric
                key={field}
                id={`metric-${field}`}
                label={label}
                icon={icon}
                required={field === "area"}
                min={0}
                inputMode="numeric"
                name={`options.propertyMetrics.${field}`}
                value={formData.options.propertyMetrics[field] ?? 0}
                onChange={handleInputChange}
              />
            ))}
        </div>
      </FormField>
    </StepField>
  );
}


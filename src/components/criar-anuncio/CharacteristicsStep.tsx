"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { InputNumeric } from "@/src/components/ui/inputs/InputNumeric.ui";
import { metricsIconsMap } from "@/src/data/global.constants";

const OPTIONS_METRICS = [
  ["area", "Área"],
  ["rooms", "Quartos"],
  ["bathrooms", "Banheiros"],
  ["garage", "Vagas garagem"],
] as const;

const FormField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <fieldset role="group" className="flex flex-col gap-2">
    <legend className="text-lg mx-auto font-semibold text-gray-800 tracking-tight">
      {label}
    </legend>
    {children}
  </fieldset>
);

export function CharacteristicsStep() {
  const { formData, updateField } = useAdvertisementFormStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, Number(value));
  };

  return (
    <div>
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
                required
                name={`options.propertyMetrics.${key}`}
                value={formData.options.propertyMetrics[key] ?? 0}
                onChange={handleInputChange}
              />
            ))}
        </div>
      </FormField>
    </div>
  );
}

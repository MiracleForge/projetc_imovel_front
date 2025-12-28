"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import CommumInput from "@/src/components/ui/inputs/Commum.inputs";

const ADDRESS_FIELDS = [
  ["state", "Estado"],
  ["city", "Cidade"],
  ["neighbourhood", "Bairro"],
  ["street", "Rua"],
  ["number", "Número"],
  ["cep", "CEP"],
] as const;

export function LocationStep() {
  const { formData, updateField } = useAdvertisementFormStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Localização</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ADDRESS_FIELDS.slice(0, 2).map(([field, label]) => (
          <CommumInput
            key={field}
            topLabel={label}
            type="text"
            name={`address.${field}`}
            value={formData.address?.[field]}
            onChange={handleInputChange}
          />
        ))}
      </div>

      {ADDRESS_FIELDS.slice(2, 4).map(([field, label]) => (
        <CommumInput
          key={field}
          topLabel={label}
          type="text"
          name={`address.${field}`}
          value={formData.address?.[field]}
          onChange={handleInputChange}
        />
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ADDRESS_FIELDS.slice(4).map(([field, label]) => (
          <CommumInput
            key={field}
            topLabel={label}
            type="text"
            name={`address.${field}`}
            value={formData.address?.[field]}
            onChange={handleInputChange}
          />
        ))}
      </div>
    </div>
  );
}

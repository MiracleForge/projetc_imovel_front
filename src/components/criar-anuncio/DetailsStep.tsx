"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import CommumInput from "@/src/components/ui/inputs/Commum.inputs";
import StepField from "../wrappers/StepField.wrapper";

export function DetailsStep() {
  const { formData, updateField } = useAdvertisementFormStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  return (
    <StepField label="Detalhes da Transação">

      <CommumInput
        topLabel="Preço (R$)"
        type="number"
        name="price"
        placeholder="1000.00"
        required
        value={formData.price}
        onChange={handleInputChange}
      />

      <CommumInput
        topLabel="Telefone de Contato"
        type="tel"
        name="phone"
        placeholder="(11) 98765-4321"
        value={formData.phone}
        required
        onChange={handleInputChange}
      />

      <CommumInput
        topLabel="WhatsApp"
        type="tel"
        name="whatsapp"
        placeholder="(11) 98765-4321"
        value={formData.whatsapp}
        onChange={handleInputChange}
      />
    </StepField>
  );
}

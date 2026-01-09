"use client";

import CommumInput from "@/src/components/ui/inputs/Commum.inputs";
import StepField from "../wrappers/StepField.wrapper";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import usePhoneFormatter from "@/src/hooks/formatter/usePhoneFormatter.hook";
import CustomCurrencyInput from "../ui/inputs/CurrencyInput.ui";

export function DetailsStep() {
  const { formData, updateField } = useAdvertisementFormStore();
  const formattPhone = usePhoneFormatter();

  return (
    <StepField label="Detalhes da Transação">

      <CustomCurrencyInput
        topLabel="Preço"
        defaultValue={formData.price}
        maxLength={15}
        onValueChange={(_value, _name, values) => {
          updateField("price", values?.float ?? 0);
        }}
        required
      />

      <CommumInput
        topLabel="Telefone de Contato"
        type="tel"
        name="phone"
        placeholder="(xx) xxxxx-xxxx"
        value={formData.phone}
        inputMode="numeric"
        required
        onChange={(e) => updateField("phone", formattPhone(e.target.value))}
      />

      <CommumInput
        topLabel="WhatsApp"
        type="tel"
        name="whatsapp"
        placeholder="(xx) xxxxx-xxxx"
        inputMode="numeric"
        value={formData.whatsapp}
        onChange={(e) => updateField("whatsapp", formattPhone(e.target.value))}
      />
    </StepField>
  );
}

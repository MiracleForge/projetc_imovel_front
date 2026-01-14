"use client";

import AdressInput from "../ui/inputs/AddressInputs.ui";
import CommumInput from "@/src/components/ui/inputs/Commum.inputs";
import StepField from "../wrappers/StepField.wrapper";
import { brazilStates } from "@/src/content/adversetiment.content";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { InputSpinner } from "../ui/spinners/InputSpinners";
import { DividerWithText, HelperText } from "../ui/separatores/FormSeparator.ui";
import { useCepLookup } from "@/src/hooks/forms/useCepLookUp";
import { useFormInput } from "@/src/hooks/forms/useFormInput.hook";

export function LocationStep() {
  const { formData, updateField } = useAdvertisementFormStore();
  const { handleInputChange } = useFormInput({ updateField })
  const { isLoadingCep, handleCepBlur } = useCepLookup();

  const stateOptions = brazilStates.map((state) => ({
    value: state.code,
    label: state.name
  }));


  return (
    <StepField label="Localização">
      <CommumInput
        topLabel="CEP"
        type="text"
        name="address.cep"
        value={formData.address?.cep || ""}
        onChange={handleInputChange}
        onBlur={handleCepBlur}
        placeholder="00000-000"
        maxLength={9}
        required
        disabled={isLoadingCep}
      />

      <HelperText text="💡 Digite o CEP para preencher automaticamente o endereço" />

      {isLoadingCep && (<InputSpinner text="Buscando endereço..." />)}

      <DividerWithText text="ou preencha manualmente" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdressInput
          optionLabel="Selecione o estado"
          topLabel="Estado"
          name="address.state"
          value={formData.address?.state || ""}
          options={stateOptions}
          onChange={handleInputChange}
          required
          disabled={isLoadingCep}
        />

        <CommumInput
          topLabel="Cidade"
          type="text"
          name="address.city"
          value={formData.address?.city || ""}
          onChange={handleInputChange}
          placeholder="Digite a cidade"
          required
          min={1}
          disabled={isLoadingCep}
        />
      </div>

      <CommumInput
        topLabel="Bairro"
        type="text"
        name="address.neighbourhood"
        value={formData.address?.neighbourhood || ""}
        onChange={handleInputChange}
        required
        placeholder="Digite o bairro"
      />

      <CommumInput
        topLabel="Rua/Logradouro"
        type="text"
        name="address.street"
        value={formData.address?.street || ""}
        onChange={handleInputChange}
        required
        placeholder="Digite o endereço"
        disabled={isLoadingCep}
      />
    </StepField>
  );
}


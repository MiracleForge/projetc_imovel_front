"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import CommumInput from "@/src/components/ui/inputs/Commum.inputs";

const SELECT_BASE = "border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 hover:bg-gray-100 duration-150";

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

export function InformationStep() {
  const { formData, updateField } = useAdvertisementFormStore();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Informações Básicas</h2>

      <CommumInput
        topLabel="Título"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Título do seu anúncio"
        required
      />

      <CommumInput
        topLabel="Subtítulo do anúncio"
        type="text"
        name="subTitle"
        value={formData.subTitle}
        onChange={handleInputChange}
        placeholder="Digite um subtítulo atrativo"
        required
      />

      <FormField label="Descrição">
        <textarea
          name="description"
          value={formData.description}
          placeholder="Descreva seu anúncio em detalhes"
          rows={4}
          className={SELECT_BASE}
          onChange={handleInputChange}
        />
      </FormField>
    </div>
  );
}

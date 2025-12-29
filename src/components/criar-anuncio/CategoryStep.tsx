"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import CheckMarkCategorys from "@/src/components/ui/inputs/CheckmarksCategorys.ui";
import { adversetimentCategoriesData, transactionMode } from "@/src/data/global.constants";
import { adversetimentCategoryDTO } from "@/src/contracts/DTOs/advertisement/advertisement.entity.dto";
import FormField from "../wrappers/FormField.wrapper";
import StepField from "../wrappers/StepField.wrapper";

export function CategoryStep() {
  const { formData, updateField, setCategory } = useAdvertisementFormStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    const finalValue = type === "checkbox" ? checked : value;

    if (name === "category") {
      setCategory(value as adversetimentCategoryDTO);
    } else {
      updateField(name, finalValue);
    }
  };

  return (
    <StepField label="Categoria do Anúncio" >
      <FormField label="Categoria do anúncio" srOnly>
        <ul
          role="listbox"
          aria-label="Categorias do anúncio"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 py-3 w-full"
        >
          {adversetimentCategoriesData.map((cat) => (
            <CheckMarkCategorys
              type="radio"
              key={cat}
              id={`category-${cat}`}
              name="category"
              categoryName={cat}
              value={cat}
              isCheckedValue={cat === formData.category}
              onChange={handleInputChange}
            />
          ))}
        </ul>
      </FormField>

      <FormField label="Modalidade do Anúncio">
        <ul
          role="listbox"
          aria-label="Modalidade do Anúncio"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 py-3 w-full"
        >
          {transactionMode
            .filter((mode) =>
              formData.category === "terrenos-sítios"
                ? mode !== "temporada"
                : true
            )
            .map((mode) => (
              <CheckMarkCategorys
                type="radio"
                key={mode}
                id={`transaction-${mode}`}
                name="transactionMode"
                categoryName={mode}
                value={mode}
                isCheckedValue={mode === formData.transactionMode}
                onChange={handleInputChange}
              />
            ))}
        </ul>
      </FormField>

      <FormField label="Opções">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 py-3 w-full">
          {[
            ["academy", "Academia"],
            ["balcony", "Sacada"],
            ["pool", "Piscina"],
            ["service_area", "Área de Serviço"],
            ["service_room", "Quarto de Serviço"],
          ].map(([field, label]) => (
            <CheckMarkCategorys
              type="checkbox"
              key={field}
              id={`amenity-${field}`}
              name={`options.amenities.${field}`}
              categoryName={label}
              value="true"
              isCheckedValue={Boolean(formData.options.amenities?.[field as keyof typeof formData.options.amenities])}
              onChange={handleInputChange}
            />
          ))}
        </ul>
      </FormField>

      <FormField label="Condominio">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 py-3 w-full">
          {[
            ["academy", "Academia"],
            ["allow_animals", "Permite animais"],
            ["close_condominion", "Condominio fechado"],
            ["elevator", "Elevador"],
            ["gate_house", "Portaria"],
          ].map(([field, label]) => (
            <CheckMarkCategorys
              type="checkbox"
              key={field}
              id={`condominion-${field}`}
              name={`options.condominion.${field}`}
              categoryName={label}
              value="true"
              isCheckedValue={Boolean(formData.options.condominion?.[field as keyof typeof formData.options.condominion])}
              onChange={handleInputChange}
            />
          ))}
        </ul>
      </FormField>
    </StepField>
  );
}

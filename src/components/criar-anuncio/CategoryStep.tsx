"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import CheckMarkCategorys from "@/src/components/ui/inputs/CheckmarksCategorys.ui";
import { adversetimentCategoriesData, transactionMode } from "@/src/content/adversetiment.content";
import FormField from "../wrappers/FormField.wrapper";
import StepField from "../wrappers/StepField.wrapper";
import { useFormInput } from "@/src/hooks/forms/useFormInput.hook";

export function CategoryStep() {
  const { formData, updateField } = useAdvertisementFormStore();

  const { handleInputChange } = useFormInput({
    updateField,
  });


  return (
    <StepField label="Categoria do Anúncio" >
      <FormField label="Categoria do anúncio" srOnly>
        <ul
          role="listbox"
          aria-label="Categorias do anúncio"
          className="formGridContainer"
        >
          {adversetimentCategoriesData.map((cat) => (
            <CheckMarkCategorys
              type="radio"
              key={cat}
              id={`category-${cat}`}
              name="category"
              categoryName={cat}
              iconKey={cat}
              value={cat}
              isCheckedValue={cat === formData.category}
              onChange={handleInputChange}
              required
            />
          ))}
        </ul>
      </FormField>

      <FormField label="Modalidade do Anúncio">
        <ul
          role="listbox"
          aria-label="Modalidade do Anúncio"
          className="formGridContainer"
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
                iconKey=""
                categoryName={mode}
                value={mode}
                isCheckedValue={mode === formData.transactionMode}
                onChange={handleInputChange}
                required
              />
            ))}
        </ul>
      </FormField>
    </StepField>
  );
}

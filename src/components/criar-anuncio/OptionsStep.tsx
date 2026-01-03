"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import CheckMarkCategorys from "@/src/components/ui/inputs/CheckmarksCategorys.ui";
import { adversetimentCategoryDTO } from "@/src/contracts/DTOs/advertisement/advertisement.entity.dto";
import FormField from "../wrappers/FormField.wrapper";
import StepField from "../wrappers/StepField.wrapper";
import { amenityIconsMap } from "@/src/data/global.constants";

export function OptionsStep() {
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

  const amenityAriaLabels: Record<string, string> = {
    academy: "Incluir academia no imóvel",
    balcony: "O imóvel possui sacada",
    pool: "O imóvel possui piscina",
    service_area: "O imóvel possui área de serviço",
    service_room: "O imóvel possui quarto de serviço",
  };

  const condominionAriaLabels: Record<string, string> = {
    academy: "O condomínio possui academia",
    allow_animals: "O condomínio permite animais",
    close_condominion: "O condomínio é fechado",
    elevator: "O condomínio possui elevador",
    gate_house: "O condomínio possui portaria",
  };

  return (
    <StepField label="Opções do Anúncio">
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
              aria-label={amenityAriaLabels[field]}
              iconKey={label}
              iconsMap={amenityIconsMap}
              value="true"
              isCheckedValue={Boolean(
                formData.options.amenities?.[
                field as keyof typeof formData.options.amenities
                ]
              )}
              onChange={handleInputChange}
            />
          ))}
        </ul>
      </FormField>


      {formData.category === "condomínios" &&
        <FormField label="Condomínio">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 py-3 w-full">
            {[
              ["academy", "Academia"],
              ["allow_animals", "Permite animais"],
              ["close_condominion", "Condomínio fechado"],
              ["elevator", "Elevador"],
              ["gate_house", "Portaria"],
            ].map(([field, label]) => (
              <CheckMarkCategorys
                type="checkbox"
                key={field}
                id={`condominion-${field}`}
                name={`options.condominion.${field}`}
                categoryName={label}
                aria-label={condominionAriaLabels[field]}
                value="true"
                isCheckedValue={Boolean(
                  formData.options.condominion?.[
                  field as keyof typeof formData.options.condominion
                  ]
                )}
                onChange={handleInputChange}
              />
            ))}
          </ul>
        </FormField>
      }

    </StepField>
  );
}


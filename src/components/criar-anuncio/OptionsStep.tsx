"use client";

import CheckMarkCategorys from "@/src/components/ui/inputs/CheckmarksCategorys.ui";
import FormField from "../wrappers/FormField.wrapper";
import StepField from "../wrappers/StepField.wrapper";
import { amenityIconsMap, condominionIconsMap } from "@/src/data/global.constants";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { useFormInput } from "@/src/hooks/forms/useFormInput.hook";

export function OptionsStep() {
  const { formData, updateField } = useAdvertisementFormStore();
  const { handleInputChange } = useFormInput({ updateField });


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
        <ul className="formGridContainer">
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
              iconKey={field}
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
          <ul className="formGridContainer">
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
                iconKey={field}
                iconsMap={condominionIconsMap}
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


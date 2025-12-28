import { create } from "zustand";
import { persist } from "zustand/middleware";
import { adversetimentCreateDTO } from "@/src/contracts/DTOs/advertisement/advertisement.create.dto";
import { adversetimentCategoryDTO } from "@/src/contracts/DTOs/advertisement/advertisement.entity.dto";

interface AdvertisementFormState {
  formData: adversetimentCreateDTO;
  currentStep: number;
  setFormData: (data: Partial<adversetimentCreateDTO>) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
  updateField: (field: string, value: unknown) => void;
  setCategory: (category: adversetimentCategoryDTO | null) => void;
}

const getDefaultFormData = (): adversetimentCreateDTO => ({
  category: null,
  title: "",
  subTitle: "",
  description: "",
  price: 0,
  transactionMode: "",
  phone: "",
  whatsapp: "",
  imagesFiles: [],
  options: {
    propertyMetrics: {
      area: 0,
      rooms: 0,
      bathrooms: 0,
      garage: 0,
    },
    amenities: {
      academy: false,
      balcony: false,
      pool: false,
      service_area: false,
      service_room: false,
    },
    condominion: {
      academy: false,
      allow_animals: false,
      close_condominion: false,
      elevator: false,
      gate_house: false,
      party_saloon: false,
      security: false,
    },
  },
  address: {
    state: "",
    city: "",
    neighbourhood: "",
    street: "",
    number: "",
    cep: "",
  },
});

export const useAdvertisementFormStore = create<AdvertisementFormState>()(
  persist(
    (set) => ({
      formData: getDefaultFormData(),
      currentStep: 0,

      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      resetForm: () =>
        set({
          formData: getDefaultFormData(),
          currentStep: 0,
        }),

      updateField: (field, value) =>
        set((state) => {
          const keys = field.split(".");
          const newFormData = { ...state.formData };
          let current: Record<string, unknown> = newFormData as Record<
            string,
            unknown
          >;

          for (let i = 0; i < keys.length - 1; i++) {
            current[keys[i]] = {
              ...(current[keys[i]] as Record<string, unknown>),
            };
            current = current[keys[i]] as Record<string, unknown>;
          }

          current[keys[keys.length - 1]] = value;

          return { formData: newFormData };
        }),

      setCategory: (category) =>
        set((state) => ({
          formData: { ...state.formData, category },
        })),
    }),
    {
      name: "advertisement-form-storage",
      partialize: (state) => ({
        formData: state.formData,
      }),
    },
  ),
);

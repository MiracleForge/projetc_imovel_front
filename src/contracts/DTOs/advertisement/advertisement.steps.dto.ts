import { adversetimentCreateSchema } from "./advertisement.create.dto";
import { propertyCategoryRules } from "./refines/propertyCategoryRules.refine";

export const categoryStepSchema = adversetimentCreateSchema.pick({
  category: true,
  transactionMode: true,
});

export const informationStepSchema = adversetimentCreateSchema.pick({
  title: true,
  subTitle: true,
  description: true,
});

export const locationStepSchema = adversetimentCreateSchema.pick({
  address: true,
});

export const detailsStepSchema = adversetimentCreateSchema.pick({
  price: true,
  phone: true,
  whatsapp: true,
});

export const characteristicsStepSchema = adversetimentCreateSchema.pick({
  category: true,
  options: true,
}).superRefine(propertyCategoryRules)

export const reviewStepSchema = adversetimentCreateSchema.pick({
  imagesFiles: true,
})

export const stepSchemas = {
  0: categoryStepSchema,
  1: informationStepSchema,
  2: locationStepSchema,
  3: detailsStepSchema,
  4: characteristicsStepSchema,
  6: reviewStepSchema,
} as const;

export type StepNumber = keyof typeof stepSchemas;

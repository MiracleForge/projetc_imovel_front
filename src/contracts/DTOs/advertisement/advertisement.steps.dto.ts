import { z } from "zod";
import {
  adversetizeCategorySchema,
  TransactionModeSchema,
} from "./advertisement.entity.dto";
import { processToNumber } from "../cores/validations/validations.cores.schemas";

// Step 0: Categoria
export const categoryStepSchema = z
  .object({
    category: adversetizeCategorySchema
      .nullable()
      .refine((val) => val !== null, {
        message: "Selecione uma categoria para continuar.",
      }),
  })
  .passthrough();

// Step 1: Informações Básicas
export const informationStepSchema = z
  .object({
    title: z
      .string()
      .min(10, "Título deve ter no mínimo 10 caracteres.")
      .max(250, "Você atingiu o máximo de caracteres."),
    subTitle: z
      .string()
      .min(10, "Subtítulo deve ter no mínimo 10 caracteres.")
      .max(250, "Você atingiu o máximo de caracteres."),
    description: z
      .string()
      .max(1000, "Você atingiu o limite máximo de caracteres.")
      .optional(),
  })
  .passthrough();

// Step 2: Localização
export const locationStepSchema = z
  .object({
    address: z.object({
      state: z.string().min(1, "Selecione o estado."),
      city: z.string().min(1, "Digite a cidade."),
      neighbourhood: z.string().min(1, "Digite o bairro."),
      street: z.string().min(1, "Digite a rua."),
      cep: z.string().min(8, "CEP deve ter 8 dígitos."),
    }),
  })
  .passthrough();

// Step 3: Detalhes da Transação
export const detailsStepSchema = z
  .object({
    price: processToNumber.refine((val) => val > 0, {
      message: "O preço deve ser maior que zero.",
    }),
    transactionMode: TransactionModeSchema.refine((val) => val !== "", {
      message: "Selecione o tipo de transação.",
    }),
  })
  .passthrough();

// Step 4: Características (depende da categoria)
export const characteristicsStepSchema = z
  .object({
    category: adversetizeCategorySchema.nullable(),
    options: z.object({
      propertyMetrics: z.object({
        area: processToNumber.refine((val) => val > 0, {
          message: "A área deve ser maior que zero.",
        }),
        rooms: processToNumber.optional(),
        bathrooms: processToNumber.optional(),
        garage: processToNumber.optional(),
      }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.category === "terrenos-sítios") {
      const metrics = data.options.propertyMetrics;

      if (metrics.rooms && metrics.rooms > 0) {
        ctx.addIssue({
          code: "custom",
          message: "Terrenos não possuem quartos.",
          path: ["options", "propertyMetrics", "rooms"],
        });
      }

      if (metrics.bathrooms && metrics.bathrooms > 0) {
        ctx.addIssue({
          code: "custom",
          message: "Terrenos não possuem banheiros.",
          path: ["options", "propertyMetrics", "bathrooms"],
        });
      }

      if (metrics.garage && metrics.garage > 0) {
        ctx.addIssue({
          code: "custom",
          message: "Terrenos não possuem garagem.",
          path: ["options", "propertyMetrics", "garage"],
        });
      }
    }
  })
  .passthrough();

// Step 5: Opções (contatos)
export const optionsStepSchema = z
  .object({
    phone: z.string().min(10, "Digite um número de telefone válido."),
    whatsapp: z.string().min(10, "Digite um número de WhatsApp válido."),
  })
  .passthrough();

// Step 6: Revisão (imagens)
export const reviewStepSchema = z
  .object({
    imagesFiles: z
      .array(z.instanceof(File))
      .min(1, "Adicione ao menos uma imagem do imóvel."),
  })
  .passthrough();

// Mapa de schemas por step
export const stepSchemas = {
  0: categoryStepSchema,
  1: informationStepSchema,
  2: locationStepSchema,
  3: detailsStepSchema,
  4: characteristicsStepSchema,
  5: optionsStepSchema,
  6: reviewStepSchema,
} as const;

export type StepNumber = keyof typeof stepSchemas;

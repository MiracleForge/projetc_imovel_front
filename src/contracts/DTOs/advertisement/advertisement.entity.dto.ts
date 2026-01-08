import { z } from "zod";
import { adversetimentCategoriesData, transactionMode } from "@/src/data/global.constants";
import { processToNumber } from "../cores/validations/validations.cores.schemas";

export type adversetimentEntityDTO = z.infer<typeof adversetimentSchema>;
export type adversetimentCategoryDTO = z.infer<typeof adversetizeCategorySchema>;
export type adversetimentPlanDTO = z.infer<typeof AdvertiseTypeSchema>;

export const AdvertiseTypeSchema = z.enum(["free", "paid", "studio"]);
export const adversetizeCategorySchema = z.enum(adversetimentCategoriesData, "Você deve selecionar uma categoria para o anúncio");
export const TransactionModeSchema = z.enum(transactionMode, "Você deve escolher o modelo de transação.");

// ENTITY
export const adversetimentSchema = z.object({
  id: z.cuid2(),
  advertiser_id: z.uuidv7(),
  advertiser_type: AdvertiseTypeSchema,

  category: adversetizeCategorySchema,
  transactionMode: TransactionModeSchema,
  promotion: z.enum(["free", "highlighted", "studio"]),

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

  price: processToNumber,

  phone: z.string(),
  images: z.array(z.url()).min(1, "Ao menos uma imagem é necessária."),

  whatsapp: z.string(),

  address: z.object({
    state: z.string().min(1, "Digite o estado."),
    city: z.string().min(1, "Digite a cidade."),
    neighbourhood: z.string().min(1, "Digite o bairro."),
    street: z.string().min(1, "Digite o bairro."),
    cep: z.string().min(1)
  }),


  options: z.object({
    propertyMetrics: z.object({
      area: processToNumber,
      rooms: processToNumber.optional(),
      bathrooms: processToNumber.optional(),
      garage: processToNumber.optional(),
    }),

    amenities: z.object({
      academy: z.boolean().optional(),
      service_room: z.boolean().optional(),
      service_area: z.boolean().optional(),
      pool: z.boolean().optional(),
      balcony: z.boolean().optional(),
    })
      .optional(),

    condominion: z
      .object({
        academy: z.boolean().optional(),
        close_condominion: z.boolean().optional(),
        elevator: z.boolean().optional(),
        allow_animals: z.boolean().optional(),
        gate_house: z.boolean().optional(),
        party_saloon: z.boolean().optional(),
        security: z.boolean().optional(),
      })
      .optional(),
  }),

  createdAt: z.date(),
  updatedAt: z.date().optional(),
})
  .superRefine((data, ctx) => {
    if (data.category === "terrenos-sítios") {
      const metrics = data.options.propertyMetrics;

      if (metrics.rooms) {
        ctx.addIssue({
          code: "custom",
          message: "Terrenos não possuem quartos.",
          path: ["options", "propertyMetrics", "rooms"],
        });
      }

      if (metrics.bathrooms) {
        ctx.addIssue({
          code: "custom",
          message: "Terrenos não possuem banheiros.",
          path: ["options", "propertyMetrics", "bathrooms"],
        });
      }

      if (metrics.garage) {
        ctx.addIssue({
          code: "custom",
          message: "Terrenos não possuem garagem.",
          path: ["options", "propertyMetrics", "garage"],
        });
      }
    }

    if (data.category !== "condomínios" && data.options.condominion) {
      ctx.addIssue({
        code: "custom",
        message:
          "Opções de condomínio só podem ser usadas se a categoria for 'condomínios'.",
        path: ["options", "condominion"],
      });
    }
  })

import { z } from "zod";
import { adversetimentCategoriesData, transactionMode } from "@/src/data/global.constants";
import { toNumber } from "../cores/validations/validations.cores.schemas";
import { propertyCategoryRules } from "./refines/propertyCategoryRules.refine";

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

  price: toNumber.pipe(z.number().positive("O preço inicial deve ser maior que R$ 0,00")),
  phone: z.preprocess((val) => {
    if (typeof val === "string") return val.replace(/\D/g, '');
    return val;
  }, z.string().min(10, "Telefone inválido")),

  imagesFiles: z
    .array(z.instanceof(File))
    .min(1, "Adicione ao menos uma imagem do imóvel."),

  whatsapp: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(val),
      {
        message: "Digite um WhatsApp válido, ex: (71) 98447-4664",
      }
    ),

  address: z.object({
    state: z.string().min(1, "Digite o estado."),
    city: z.string().min(1, "Digite a cidade."),
    neighbourhood: z.string().min(1, "Digite o bairro."),
    street: z.string().min(1, "Digite o."),
    cep: z.string().min(1)
  }),

  options: z.object({
    propertyMetrics: z.object({
      area: toNumber.pipe(
        z.number().positive("Área deve ser maior que zero")
      ),
      rooms: toNumber
        .pipe(z.number().min(0, "Número de quartos inválido"))
        .optional(),
      bathrooms: toNumber
        .pipe(z.number().min(0, "Número de banheiros inválido"))
        .optional(),
      garage: toNumber
        .pipe(z.number().min(0, "Número de vagas inválido"))
        .optional(),
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
}).superRefine(propertyCategoryRules)

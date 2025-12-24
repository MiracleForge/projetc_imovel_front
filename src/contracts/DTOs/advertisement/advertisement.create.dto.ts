import { z } from "zod";
import { adversetimentSchema } from "./advertisement.entity.dto";

export const adversetimentCreateSchema = adversetimentSchema.pick({
  title: true,
  subTitle: true,
  description: true,
  phone: true,
  whatsapp: true,
  // images: true,
  price: true,
  category: true,
  address: true,
  transactionMode: true,
  // options: true
})

export type adversetimentCreateDTO = z.infer<typeof adversetimentCreateSchema>;

import { z } from "zod";
import { adversetimentSchema } from "./advertisement.entity.dto";

export const adversetimentCreateSchema = adversetimentSchema.pick({
  advertiser_id: true,
  title: true,
  subTitle: true,
  description: true,
  phone: true,
  whatsapp: true,
  imagesURL: true,
  price: true,
  category: true,
  address: true,
  transactionMode: true,
  options: true
}).strict();

export type adversetimentCreateDTO = z.infer<typeof adversetimentCreateSchema>;

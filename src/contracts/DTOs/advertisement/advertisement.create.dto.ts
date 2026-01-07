import { z } from "zod";
import { adversetimentSchema } from "./advertisement.entity.dto";
import { imagesSchema } from "../cores/images/refineImages.core.dto";

export const adversetimentCreateSchema = adversetimentSchema
  .pick({
    title: true,
    subTitle: true,
    description: true,
    category: true,
    promotion: true,
    phone: true,
    whatsapp: true,
    price: true,
    address: true,
    options: true,
    transactionMode: true,
  })
  .extend({
    imagesFiles: imagesSchema
  });

export type adversetimentCreateDTO = z.infer<typeof adversetimentCreateSchema>;

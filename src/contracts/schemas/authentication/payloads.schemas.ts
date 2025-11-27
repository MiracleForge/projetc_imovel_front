import { z } from "zod"
import { userEntitySchema } from "../users/user.entity";

export const loginSchema = userEntitySchema.pick({
  email: true,
  password: true
}).extend({
  remember: z.boolean()
}).strict();

export const registerPayloadSchema = userEntitySchema
  .pick({
    name: true,
    surname: true,
    email: true,
    password: true,
    birthdate: true,
    is_juridic: true,
    document_number: true,
    phone: true,
    address: true,
    accepts_emails_promotions: true,
    cookies_allowed: true,
    avatar_url: true,
  })
  .merge(
    z.object({
      confirmPassword: z.string(),
      questionSecurity: z.string()
    }),
  )
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Os campos de senha e confirmar senha precisam ser idênticos",
    path: ["confirmPassword"],
  }).strict()
  .describe("Schema name: registerPayloadSchema and registerPayloadType");




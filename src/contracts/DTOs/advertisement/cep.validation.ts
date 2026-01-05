import { z } from "zod";

export const cepServerSchema = z
  .string()
  .min(8, "CEP deve ter 8 dígitos")
  .max(9, "CEP deve ter no máximo 9 dígitos com hífen")
  .refine((val) => /^[\d]{8}$|^[\d]{5}-[\d]{3}$/.test(val), {
    message: "CEP inválido. Use 00000‑000 ou 00000000",
  })
  .transform((val) => val.replace(/\D/g, "")); // transforma para 8 dígitos sem hífen


import { z } from "zod";

export const processToNumber = z.preprocess((val) => {
  if (typeof val === "string") return Number(val);
  return val;
}, z.number().min(0, "Valores negativos não são permitidos").nonnegative("Valores negativos não são permitidos"))

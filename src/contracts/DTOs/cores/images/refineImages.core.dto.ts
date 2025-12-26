import { z } from "zod";

export const imagesSchema = z
  .any()
  .transform((value) => {
    if (typeof FileList !== "undefined" && value instanceof FileList) {
      return Array.from(value);
    }

    if (Array.isArray(value)) {
      return value as File[];
    }

    return value ? [value] : [];
  })
  .refine((files: File[]) => files.every(f => f.size <= 10 * 1024 * 1024), {
    message: "Cada imagem deve ter no máximo 10MB",
  })
  .refine((files: File[]) => files.every(f => f.type.startsWith("image/")), {
    message: "Somente imagens são permitidas",
  });


import { z } from "zod";

export const StudioEntity = z.object({
  id: z.string(),

  bannerImage: z.url(),
  avatar: z.url(),

  name: z.string(),
  subtitle: z.string(),
  description: z.string(),

  stats: z.object({
    anuncios: z.object({
      label: z.string(),
      value: z.number().int().nonnegative()
    }),
    visualizacoes: z.object({
      label: z.string(),
      value: z.number().int().nonnegative()
    }),
    favoritos: z.object({
      label: z.string(),
      value: z.number().int().nonnegative()
    }),
    avaliacao: z.object({
      label: z.string(),
      value: z.number().min(0).max(5),
      max: z.number().min(1)
    })
  })
});

export type StudioEntity = z.infer<typeof StudioEntity>;


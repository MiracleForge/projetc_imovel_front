import { z } from "zod";

export type userEntityDTO = z.infer<typeof userEntitySchema>;
export const userEntitySchema = z.object({
  id: z.uuidv7(),
  name: z.string(),
  image: z.url().nullable()
})

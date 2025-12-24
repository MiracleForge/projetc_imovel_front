import { z } from "zod";
import { userEntitySchema } from "../user.entity.dto";

export type subscriptionsDTO = z.infer<typeof subscriptionsEntity>;
export const subscriptionsEntity = z.object({
  id: z.cuid2(),
  hasNewPublication: z.boolean(),
  studiosOwner: userEntitySchema.pick({
    image: true,
    name: true,
  })
})

import { z } from "zod"
import { loginSchema } from "../schemas/authentication/payloads.schemas";

export type loginPayload = z.infer<typeof loginSchema>;


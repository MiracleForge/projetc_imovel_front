import { z } from "zod";
import { registerPayloadSchema } from "../../schemas/authentication/payloads.schemas";

export type registerPayload = z.infer<typeof registerPayloadSchema>;

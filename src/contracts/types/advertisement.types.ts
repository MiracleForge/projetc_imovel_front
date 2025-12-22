import { z } from "zod";
import { CardsTypeSchema } from "../schemas/advertisement/advertisement.entity";

export type adversetimentCategoriesType = z.infer<typeof CardsTypeSchema>;

import { z } from "zod";

export const propertyCategoryRules = (
  data: {
    category?: string;
    options?: any;
  },
  ctx: z.RefinementCtx
) => {
  if (!data.category || !data.options?.propertyMetrics) return;

  const metrics = data.options.propertyMetrics;

  if (data.category === "terrenos-sítios") {
    if (metrics.rooms && metrics.rooms > 0) {
      ctx.addIssue({
        code: "custom",
        message: "Terrenos não possuem quartos.",
        path: ["options", "propertyMetrics", "rooms"],
      });
    }

    if (metrics.bathrooms && metrics.bathrooms > 0) {
      ctx.addIssue({
        code: "custom",
        message: "Terrenos não possuem banheiros.",
        path: ["options", "propertyMetrics", "bathrooms"],
      });
    }

    if (metrics.garage && metrics.garage > 0) {
      ctx.addIssue({
        code: "custom",
        message: "Terrenos não possuem garagem.",
        path: ["options", "propertyMetrics", "garage"],
      });
    }
  }

  if (data.category !== "condomínios" && data.options.condominion) {
    ctx.addIssue({
      code: "custom",
      message:
        "Opções de condomínio só podem ser usadas se a categoria for 'condomínios'.",
      path: ["options", "condominion"],
    });
  }
};


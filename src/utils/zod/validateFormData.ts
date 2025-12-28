import { ZodSchema } from "zod";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { formDataToObject } from "./converts";

export async function validateFormData<T>(
  formData: FormData | Record<string, unknown>,
  schema: ZodSchema<T>,
): Promise<
  | { success: true; data: T }
  | { success: false; error: actionResponse<unknown> }
> {
  let data: Record<string, unknown>;

  if (formData instanceof FormData) {
    data = formDataToObject(formData);
  } else {
    data = formData;
  }

  // converte chaves planas como 'address.state' em objetos aninhados
  data = nestFlatKeys(data);

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const formattedMessages = parsed.error.issues
      .map((issue) => issue.message)
      .join("\n");

    return {
      success: false,
      error: {
        message: formattedMessages,
        error: formattedMessages,
        data: { values: data },
      },
    };
  }

  return { success: true, data: parsed.data };
}

export function unflatten(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const keys = key.split(".");
    keys.reduce((acc: Record<string, unknown>, k: string, i: number) => {
      if (i === keys.length - 1) {
        acc[k] = obj[key];
      } else {
        acc[k] = acc[k] || {};
      }
      return acc[k] as Record<string, unknown>;
    }, result);
  }
  return result;
}

// Helper para transformar chaves planas em objetos aninhados
function nestFlatKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (key.includes(".")) {
      const parts = key.split(".");
      let cur = result;

      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          cur[part] = obj[key]; // valor final
        } else {
          if (!cur[part]) cur[part] = {};
          cur = cur[part] as Record<string, unknown>;
        }
      });
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}

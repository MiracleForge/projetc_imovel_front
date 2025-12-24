import { ZodSchema } from "zod";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { formDataToObject } from "./converts";

export async function validateFormData<T>(
  formData: FormData | Record<string, any>,
  schema: ZodSchema<T>
): Promise<
  | { success: true; data: T }
  | { success: false; error: actionResponse<any> }
> {
  let data: Record<string, any>;

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
      .map(issue => issue.message)
      .join("\n");

    return {
      success: false,
      error: {
        message: formattedMessages,
        error: formattedMessages,
        data: { values: data }
      }
    };
  }

  return { success: true, data: parsed.data };
}

export function unflatten(obj: Record<string, any>) {
  const result: any = {};
  for (const key in obj) {
    const keys = key.split('.');
    keys.reduce((acc, k, i) => {
      if (i === keys.length - 1) {
        acc[k] = obj[key];
      } else {
        acc[k] = acc[k] || {};
      }
      return acc[k];
    }, result);
  }
  return result;
}

// Helper para transformar chaves planas em objetos aninhados
function nestFlatKeys(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (key.includes(".")) {
      const parts = key.split(".");
      let cur = result;

      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          cur[part] = obj[key]; // valor final
        } else {
          if (!cur[part]) cur[part] = {};
          cur = cur[part];
        }
      });
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}


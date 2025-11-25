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

  // Converte FormData para objeto preservando estruturas aninhadas
  let data: Record<string, any>;

  if (formData instanceof FormData) {
    data = formDataToObject(formData);
  } else {
    data = formData;
  }

  // Valida com Zod
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: parsed.error.issues.map(issue => issue.message).join(", "),
        error: parsed.error.issues.map(issue => issue.message).join(", "),
        data: { values: data }
      }
    };
  }

  return { success: true, data: parsed.data };
}

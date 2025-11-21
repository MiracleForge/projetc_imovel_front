import { ZodSchema } from "zod";
import { actionResponse } from "@/src/schemasTypes/types/responses.core";

export async function validateFormData<T>(
  formData: FormData,
  schema: ZodSchema<T>
): Promise<
  | { success: true; data: T }
  | { success: false; error: actionResponse<any> }
> {

  const raw = Object.fromEntries(formData.entries());
  const data = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, String(v)])
  ) as Record<string, string>;

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: parsed.error.issues.map(issue => issue.message).join(", "),
        error: parsed.error.issues.map(issue => issue.code).join(", "),
        data: { values: data }
      }
    };
  }

  return { success: true, data: parsed.data };
}

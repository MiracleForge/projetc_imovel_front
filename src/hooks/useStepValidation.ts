import { useState } from "react";
import { z } from "zod";

export interface ValidationError {
  field: string;
  message: string;
}

export function useStepValidation() {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateStep = <T>(data: T, schema: z.ZodTypeAny): boolean => {
    try {
      const result = schema.safeParse(data);

      if (result.success) {
        setErrors([]);
        return true;
      }

      // result.success === false, então result.error existe
      if (!result.error) {
        console.error("No error object in failed validation");
        setErrors([
          {
            field: "unknown",
            message:
              "Erro ao validar os dados. Por favor, verifique os campos.",
          },
        ]);
        return false;
      }

      // ZodError tem a propriedade issues (não errors)
      const zodError = result.error as z.ZodError;

      if (!zodError.issues || !Array.isArray(zodError.issues)) {
        console.error("No issues array in ZodError:", zodError);
        setErrors([
          {
            field: "unknown",
            message:
              "Erro ao validar os dados. Por favor, verifique os campos.",
          },
        ]);
        return false;
      }

      const formattedErrors: ValidationError[] = zodError.issues.map(
        (issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }),
      );

      setErrors(formattedErrors);
      return false;
    } catch (error) {
      console.error("Exception during validation:", error);
      setErrors([
        {
          field: "error",
          message: "Erro inesperado ao validar. Tente novamente.",
        },
      ]);
      return false;
    }
  };

  const clearErrors = () => setErrors([]);

  return { errors, validateStep, clearErrors };
}


import { actionResponse } from "@/src/contracts/types/responses.core";
import { verifyAuthentication } from "@/src/dal/auth";

export function withAuth<T>(
  action: () => Promise<actionResponse<T>>,
): Promise<actionResponse<T>> {
  return (async () => {
    try {
      await verifyAuthentication();
      return await action();
    } catch (error) {
      return {
        error: "UNAUTHORIZED",
        message:
          error instanceof Error
            ? error.message
            : "Você precisa estar autenticado",
        data: undefined,
      };
    }
  })();
}


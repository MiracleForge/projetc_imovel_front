export type zodValidationState = {
  success: boolean
  message?: string
  issues?: { path: (string | number)[]; message: string }[]
};

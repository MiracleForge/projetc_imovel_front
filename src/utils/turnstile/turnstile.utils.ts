export const getTurnstileToken = (
  formData: FormData
): string | null => {

  const widgetToken = formData.get("cf-turnstile-response") as string | null;
  formData.delete("cf-turnstile-response");

  return widgetToken;
};


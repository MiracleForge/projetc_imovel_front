"use server";

import { adversetimentCreateDTO, adversetimentCreateSchema } from "@/src/contracts/DTOs/advertisement/advertisement.create.dto";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { createFetcher } from "@/src/utils/fetchData";
import { validateFormData } from "@/src/utils/zod/validateFormData";
import { redirect } from "next/navigation";

export async function createAdversetimentAction(_prevState: any, formData: FormData): Promise<actionResponse<undefined>> {
  console.log(formData)
  console.log("🔵 FormData RAW:");
  for (const pair of formData.entries()) {
    console.log("➡️", pair[0], pair[1]);
  }

  const payloadValided = await validateFormData(formData, adversetimentCreateSchema);
  if (!payloadValided.success) {
    console.log(payloadValided.error)
    return payloadValided.error;
  }
  console.log(validateFormData)
  const path = "public-create-adversetiment";
  const fetchAdversetiment = createFetcher<adversetimentCreateDTO, undefined>(path, { method: "POST" });

  const result = await fetchAdversetiment(payloadValided.data);
  console.log(result.error)
  if (result.error) return result;

  redirect("/");
}

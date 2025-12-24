"use server";

import { adversetimentCreateDTO, adversetimentCreateSchema } from "@/src/contracts/DTOs/advertisement/advertisement.create.dto";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { createPrivateFecher } from "@/src/utils/fetcher.private";
import { formDataToObject } from "@/src/utils/zod/converts";
import { unflatten } from "@/src/utils/zod/validateFormData";
import { redirect } from "next/navigation";

export async function createAdversetimentAction(_prevState: any, formData: FormData): Promise<actionResponse<undefined>> {

  const rawData = formDataToObject(formData);

  const nestedData = unflatten(rawData);
  const payloadValidated = adversetimentCreateSchema.safeParse(nestedData);

  if (!payloadValidated.success) return payloadValidated.error;

  const path = `public-create-adversetiment/${payloadValidated.data.category}`;
  const fetchAdversetiment = createPrivateFecher<adversetimentCreateDTO, undefined>(path, { method: "POST" });

  const result = await fetchAdversetiment(payloadValidated.data);

  if (result.error) return result;

  redirect("/");
}





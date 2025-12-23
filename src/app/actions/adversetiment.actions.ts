"use server";

import { adversetimentCreateDTO, adversetimentCreateSchema } from "@/src/contracts/DTOs/advertisement/advertisement.create.dto";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { createFetcher } from "@/src/utils/fetchData";
import { formDataToObject } from "@/src/utils/zod/converts";
import { validateFormData } from "@/src/utils/zod/validateFormData";
import { redirect } from "next/navigation";

export async function createAdversetimentAction(_prevState: any, formData: FormData): Promise<actionResponse<undefined>> {
  console.log(formData)
  console.log("🔵 FormData RAW:");
  for (const pair of formData.entries()) {
    console.log("➡️", pair[0], pair[1]);
  }

  function unflatten(obj: Record<string, any>) {
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

  const rawData = formDataToObject(formData);
  rawData.advertiser_id = "018f92c4-f18a-7e55-81cd-3b92f8ac4e7a";
  const nestedData = unflatten(rawData);

  const payloadValidated = adversetimentCreateSchema.safeParse(nestedData);

  if (!payloadValidated.success) {
    console.log(payloadValidated.error);
    return payloadValidated.error;
  }
  console.log(validateFormData)


  console.log("funcitonou tudo ");
  const path = "public-create-adversetiment";
  const fetchAdversetiment = createFetcher<adversetimentCreateDTO, undefined>(path, { method: "POST" });

  const result = await fetchAdversetiment(payloadValidated.data);
  console.log(result.error)
  if (result.error) return result;
  redirect("/");
}

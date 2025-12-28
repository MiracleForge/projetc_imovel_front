"use server";

import {
  adversetimentCreateDTO,
  adversetimentCreateSchema,
} from "@/src/contracts/DTOs/advertisement/advertisement.create.dto";
import { actionResponse } from "@/src/contracts/types/responses.core";
import { createPrivateFecher } from "@/src/utils/fetcher.private";
import { formDataToObject } from "@/src/utils/zod/converts";
import { unflatten } from "@/src/utils/zod/validateFormData";
import { redirect } from "next/navigation";

export async function createAdversetimentAction(
  _prevState: actionResponse,
  formData: FormData,
): Promise<actionResponse<undefined>> {
  console.log("═══════════════════════");
  console.log("📥 RECEIVED FORM DATA");
  console.log("═══════════════════════");

  // Log real do FormData
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`• ${key}: FILE → ${value.name} (${value.size} bytes)`);
    } else {
      console.log(`• ${key}: "${value}"`);
    }
  }

  console.log("\n═══════════════════════");
  console.log("🔄 CONVERTING FORM DATA TO RAW OBJECT");
  console.log("═══════════════════════");

  const rawData = formDataToObject(formData);
  console.log(rawData);

  console.log("\n═══════════════════════");
  console.log("📦 UNFLATTENED DATA");
  console.log("═══════════════════════");

  const nestedData = unflatten(rawData);
  console.log(nestedData);

  console.log("\n═══════════════════════");
  console.log("🧪 VALIDATING ZOD SCHEMA");
  console.log("═══════════════════════");

  const payloadValidated = adversetimentCreateSchema.safeParse(nestedData);

  if (!payloadValidated.success) {
    console.log("❌ ZOD VALIDATION FAILED");
    console.log(payloadValidated.error);
    return payloadValidated.error;
  }

  console.log("✅ ZOD VALIDATION SUCCESS");
  console.log("Images received:", payloadValidated.data.imagesFiles);

  const path = `public-create-adversetiment/${payloadValidated.data.category}`;
  const fetchAdversetiment = createPrivateFecher<
    adversetimentCreateDTO,
    undefined
  >(path, {
    method: "POST",
  });

  console.log("\n═══════════════════════");
  console.log("🚀 SENDING PAYLOAD TO API");
  console.log("═══════════════════════");

  console.log(payloadValidated.data);

  const result = await fetchAdversetiment(payloadValidated.data);

  if (result.error) {
    console.log("❌ API ERROR");
    console.log(result);
    return result;
  }

  console.log("✅ CREATED SUCCESSFULLY — Redirecting...");
  redirect("/");
}

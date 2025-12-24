"use server";

import { subscriptionsDTO } from "@/src/contracts/DTOs/user/views/subscriptions.dto";
import { createPrivateFecher } from "@/src/utils/fetcher.private";

export async function subscriptionGetById(): Promise<subscriptionsDTO[]> {

  const fetcher = createPrivateFecher<undefined, subscriptionsDTO[]>(
    "/api/subscriptions",
    { method: "GET", isPublic: false }
  );

  const result = await fetcher(undefined);

  return result?.data ?? [];
}

export async function subscriptionCreate() { /* ... */ }
export async function subscriptionUpdate() { /* ... */ }
export async function subscriptionDelete() { /* ... */ }


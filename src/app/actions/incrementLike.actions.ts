"use server";

import { createPrivateFecher } from "@/src/utils/fetcher.private";
import { verifyAuthentication } from "@/src/dal/auth";

export default async function incrementLike(): Promise<boolean> {
  // Verify authentication following DAL pattern
  let session;
  try {
    session = await verifyAuthentication();
  } catch (error) {
    return false;
  }

  const fetcher = createPrivateFecher<undefined, string>("/api/update/like", {
    method: "GET",
    isPublic: false,
    raw: true,
    body: session.user?.id,
  });

  await fetcher();
  return true;
}

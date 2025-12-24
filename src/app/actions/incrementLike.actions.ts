'use server';

import { Session } from "next-auth";
import { auth } from "@/auth"
import { createPrivateFecher } from "@/src/utils/fetcher.private";

export default async function incrementLike(): Promise<boolean> {
  const session: Session | null = await auth();
  if (!session || !session.user) return false;

  const fetcher = createPrivateFecher<undefined, string>("/api/update/like", {
    method: "GET",
    isPublic: false,
    raw: true,
    body: session.user.id
  },);

  const { error } = await fetcher();
  return !error;
}


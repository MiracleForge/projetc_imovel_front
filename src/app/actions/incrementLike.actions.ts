'use server';

import { createFetcher } from "@/src/utils/fetchData";
import { Session } from "next-auth";
import { auth } from "@/auth"

export default async function incrementLike(): Promise<boolean> {
  const session: Session | null = await auth();
  if (!session || !session.user) return false;

  const fetcher = createFetcher<undefined, string>("/api/update/like", {
    method: "GET",
    isPublic: false,
    raw: true,
    body: session.user.id
  },);

  const { error } = await fetcher();
  return !error;
}


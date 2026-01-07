"use server";

import "server-only";
import { cache } from "react";
import { auth } from "@/auth";
import type { Session } from "next-auth";

/**
 * Gets the current authenticated user session.
 * This function is cached per request to avoid multiple session lookups.
 *
 * @returns The current session or null if not authenticated
 */
export const getCurrentUser = cache(async (): Promise<Session | null> => {
  const session = await auth();
  return session;
});

/**
 * Verifies if user is authenticated and throws error if not.
 * Use this in Server Actions that require authentication.
 *
 * @throws Error if user is not authenticated
 * @returns The authenticated session
 */
export const verifyAuthentication = async (): Promise<Session> => {
  const session = await getCurrentUser();

  if (!session || !session.user) {
    throw new Error("Você precisa estar autenticado para realizar esta ação");
  }

  return session;
};

/**
 * Checks if user is authenticated without throwing error.
 *
 * @returns true if authenticated, false otherwise
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const session = await getCurrentUser();
  return Boolean(session?.user);
};

"use server";

import "server-only";
import { cache } from "react";
import { subscriptionsDTO } from "@/src/contracts/DTOs/user/views/subscriptions.dto";
import { createPrivateFecher } from "@/src/utils/fetcher.private";
import { verifyAuthentication } from "./auth";

/**
 * Fetches all subscriptions for the authenticated user.
 * This function is cached per request to avoid duplicate calls.
 * Requires user to be authenticated.
 *
 * @returns Array of user subscriptions or empty array if error/not authenticated
 *
 * @example
 * const subscriptions = await getUserSubscriptions();
 * console.log(subscriptions.length);
 */
export const getUserSubscriptions = cache(
  async (): Promise<subscriptionsDTO[]> => {
    // Verify authentication following DAL pattern
    try {
      await verifyAuthentication();
    } catch (error) {
      console.error("❌ User not authenticated:", error);
      return [];
    }

    const fetcher = createPrivateFecher<undefined, subscriptionsDTO[]>(
      "/api/subscriptions",
      { method: "GET", isPublic: false },
    );

    const result = await fetcher(undefined);

    if (result.error) {
      console.error("❌ Error fetching subscriptions:", result.error);
      return [];
    }

    return result?.data ?? [];
  },
);

/**
 * Fetches a specific subscription by ID for the authenticated user.
 * This function is cached per request.
 *
 * @param subscriptionId - The ID of the subscription to fetch
 * @returns Subscription data or null if not found
 *
 * @example
 * const subscription = await getSubscriptionById("123");
 * if (subscription) {
 *   console.log(subscription.title);
 * }
 */
export const getSubscriptionById = cache(
  async (subscriptionId: string): Promise<subscriptionsDTO | null> => {
    try {
      await verifyAuthentication();
    } catch (error) {
      console.error("❌ User not authenticated:", error);
      return null;
    }

    const fetcher = createPrivateFecher<undefined, subscriptionsDTO>(
      `/api/subscriptions/${subscriptionId}`,
      { method: "GET", isPublic: false },
    );

    const result = await fetcher(undefined);

    if (result.error) {
      console.error("❌ Error fetching subscription:", result.error);
      return null;
    }

    return result?.data ?? null;
  },
);

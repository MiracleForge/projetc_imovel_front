import { advertisementPage, homeCardAdvertisement } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";
import { cache } from "react";

export const getAdvertisementBySlug = cache(
  async (): Promise<advertisementPage | null> => {
    try {
      const response = await fetch(
        "https://free.mockerapi.com/mock/aaffd2e8-6b2c-4620-8cbd-65f27739550b"
      );

      if (!response.ok) throw new Error("Fetch failed");
      return await response.json() ?? null;
    } catch (error) {
      console.error("Error fetching advertisement:", error);
      return null;
    }
  }
);
export const getAdvertisementsByCategory = async (category: string): Promise<homeCardAdvertisement[]> => {
  try {
    const response = await fetch(
      `https://free.mockerapi.com/mock/.../category/${category}`
    );
    if (!response.ok) throw new Error("Fetch failed");
    const data: homeCardAdvertisement[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    return [];
  }
};


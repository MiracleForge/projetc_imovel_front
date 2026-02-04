import { cache } from "react";
import { StudioEntity } from "../contracts/DTOs/ImobilyStudio/ImobilyStudio.entity.dto";

export const getImobilyStudioResumed = cache(
  async (): Promise<StudioEntity | null> => {
    try {
      const response = await fetch(
        "https://free.mockerapi.com/mock/76e86aa5-1ac0-48ba-abeb-96587d8954c5"
      );

      if (!response.ok) throw new Error("Fetch failed");
      return await response.json() ?? null;
    } catch (error) {
      console.error("Error fetching advertisement:", error);
      return null;
    }
  }
);

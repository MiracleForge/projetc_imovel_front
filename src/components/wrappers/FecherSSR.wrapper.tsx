
import { HomeCardsType } from "@/src/contracts/types/cards/responses.type";
import { HorizontalCardSection } from "../layouts/cards/cardSections/HorizontalCardSection.layout";
import { createFetcher } from "@/src/utils/fetchData";

export default async function FecherSSR() {
  const fetchCardCategory = createFetcher<undefined, HomeCardsType[]>(
    "http://localhost:3000/api/cards",
    { method: "GET", isPublic: true, raw: true }
  );

  const cards = await fetchCardCategory();
  if (!cards || !Array.isArray(cards)) return null;

  return <HorizontalCardSection hasFilter cards={cards} />;
}


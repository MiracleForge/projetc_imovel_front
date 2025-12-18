import { createFetcher } from "@/src/utils/fetchData";
import FilteradeCardSection from "./FilteradeCardSection.layout";
import { HomeCardsType } from "@/src/contracts/types/cards/responses.type";

export default async function CardSectionServer() {
  const fetchCardCategory = createFetcher<undefined, HomeCardsType[]>(
    "http://localhost:3000/api/cards",
    { method: "GET", isPublic: true, raw: true }
  );

  const cards = await fetchCardCategory();
  if (!cards || !Array.isArray(cards)) return null;

  return <FilteradeCardSection cards={cards} />;
}


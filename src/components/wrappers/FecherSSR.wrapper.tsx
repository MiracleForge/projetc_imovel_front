
import { HorizontalCardSection } from "../layouts/cards/cardSections/HorizontalCardSection.layout";
import { createPublicFetcher } from "@/src/utils/fetcher.public";
import { homeCardAdvertisement } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";

export default async function FecherSSR() {
  const fetchCardCategory = createPublicFetcher<undefined, homeCardAdvertisement[]>(
    "http://localhost:3000/api/cards",
    { method: "GET", isPublic: true }
  );

  const cards = await fetchCardCategory();
  console.log(cards)
  if (!cards || !cards.data) return null;

  return <HorizontalCardSection hasFilter cards={cards.data} />;
}


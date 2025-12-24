"use client";

import { useEffect, useState } from "react";
import SectionCardSkeleton from "../layouts/cards/cardSections/HorizontalCardSection.skeleton";
import { HorizontalCardSection } from "../layouts/cards/cardSections/HorizontalCardSection.layout";
import { createPublicFetcher } from "@/src/utils/fetcher.public";
import { homeCardAdvertisement } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";

export default function FecherClient({
  query,
  hasFilter = false,
}: {
  query: string;
  hasFilter?: boolean;
}) {
  const [cards, setCards] = useState<homeCardAdvertisement[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      const fetcher = createPublicFetcher<undefined, homeCardAdvertisement[]>(query, {
        method: "GET",
        isPublic: true,
      });

      const data = await fetcher();
      setCards(data.data);
      setLoading(false);
    };

    fetchCards();
  }, [query]);

  if (loading) return <SectionCardSkeleton />;
  if (!cards) return null;

  return <HorizontalCardSection cards={cards} hasFilter={hasFilter} />;
}


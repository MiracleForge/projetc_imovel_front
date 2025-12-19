"use client";

import { useEffect, useState } from "react";
import { createFetcher } from "@/src/utils/fetchData";
import { HomeCardsType } from "@/src/contracts/types/cards/responses.type";
import SectionCardSkeleton from "../layouts/cards/cardSections/HorizontalCardSection.skeleton";
import { HorizontalCardSection } from "../layouts/cards/cardSections/HorizontalCardSection.layout";

export default function FecherClient({
  query,
  hasFilter = false,
}: {
  query: string;
  hasFilter?: boolean;
}) {
  const [cards, setCards] = useState<HomeCardsType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      const fetcher = createFetcher<undefined, HomeCardsType[]>(query, {
        method: "GET",
        isPublic: true,
        raw: true,
      });

      const data = await fetcher();
      setCards(Array.isArray(data) ? data : []);
      setLoading(false);
    };

    fetchCards();
  }, [query]);

  if (loading) return <SectionCardSkeleton />;
  if (!cards) return null;

  return <HorizontalCardSection cards={cards} hasFilter={hasFilter} />;
}


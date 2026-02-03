"use client";

import { useState } from "react";
import FilterCards from "@/src/components/ui/buttons/filters/CardCategoryFilter.ui";
import HorizontalScroll from "@/src/components/wrappers/ResponsiveHorizontalScroll.wrapper";
import PublicationCard from "@/src/components/ui/cards/PublicationCard.list";
import { homeCardAdvertisement } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";

export function HorizontalCardSection({
  cards,
  hasFilter = false,
}: {
  cards: homeCardAdvertisement[];
  hasFilter?: boolean;
}) {
  const [filtered, setFiltered] = useState(cards);

  if (cards.length === 0) return null;

  return (
    <section className="wrapper-cards-container space-y-4">
      <div className="wrapper-cards-header tipografy-title">
        <h3 className="wrapper-cards-title">Recém Publicados</h3>
        <p className="wrapper-cards-subtitle">
          HOJE! <span className="wrapper-cards-badge" />
        </p>
      </div>

      {hasFilter && <FilterCards itemsArray={cards} onFilter={setFiltered} />}

      <HorizontalScroll>
        <ul className="wrapper-cards-list">
          {(hasFilter ? filtered : cards).map((card) => (
            <PublicationCard key={card.slugUrl} data={card} />
          ))}
        </ul>
      </HorizontalScroll>
    </section>
  );
}


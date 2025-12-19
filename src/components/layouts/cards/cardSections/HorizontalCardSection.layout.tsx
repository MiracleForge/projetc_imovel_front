"use client";

import { useState } from "react";
import FilterCards from "@/src/components/ui/buttons/filters/CardCategoryFilter.ui";
import HorizontalScroll from "@/src/components/wrappers/ResponsiveHorizontalScroll.wrapper";
import { HomeCardsType } from "@/src/contracts/types/cards/responses.type";
import PublicationCard from "@/src/components/ui/cards/PublicationCard.list";

export function HorizontalCardSection({
  cards,
  hasFilter = false,
}: {
  cards: HomeCardsType[];
  hasFilter?: boolean;
}) {
  const [filtered, setFiltered] = useState(cards);

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
          {(hasFilter ? filtered : cards).map((card, index) => (
            <PublicationCard key={`${card.slugUrl}-${index}`} {...card} />
          ))}
        </ul>
      </HorizontalScroll>
    </section>
  );
}


"use client";

import { useState } from "react";
import FilterCards from "@/src/components/ui/buttons/filters/CardCategoryFilter.ui";
import HomeCard from "@/src/components/ui/cards/HomeCard.ui";
import { HomeCardProps } from "@/src/contracts/types/cards/responses.type";
import HorizontalScroll from "@/src/components/context/ResponsiveHorizontalScroll.context";

export default function FilteradeCardSection({
  cards,
}: {
  cards: HomeCardProps[];
}) {
  const [filteredCards, setFilteredCards] = useState<HomeCardProps[]>(cards);

  return (
    <section className="wrapper-cards-container space-y-4">
      <div className="wrapper-cards-header tipografy-title">
        <h3 className="wrapper-cards-title">Recém Publicados</h3>
        <p className="wrapper-cards-subtitle">
          HOJE! <span className="wrapper-cards-badge" />
        </p>
      </div>

      <FilterCards
        itemsArray={cards}
        onFilter={setFilteredCards}
      />
      <HorizontalScroll>
        <ul className="w-max shrink-0 inline-flex items-center space-x-3 font-medium leading-7 whitespace-nowrap py-1 px-1 rounded-lg gap-6">
          {filteredCards.map((card, index) => (
            <HomeCard
              key={`${card.slugUrl}-${index}`}
              {...card}
            />
          ))}
        </ul>
      </HorizontalScroll>
    </section>
  );
}


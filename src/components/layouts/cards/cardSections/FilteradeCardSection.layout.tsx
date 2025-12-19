"use client";

import { useState } from "react";
import FilterCards from "@/src/components/ui/buttons/filters/CardCategoryFilter.ui";
import HomeCard from "@/src/components/ui/cards/HomeCard.ui";
import HorizontalScroll from "@/src/components/context/ResponsiveHorizontalScroll.context";
import { HomeCardsType } from "@/src/contracts/types/cards/responses.type";

export default function FilteradeCardSection({
  cards,
}: {
  cards: HomeCardsType[];
}) {
  const [filteredCards, setFilteredCards] = useState<HomeCardsType[]>(cards);

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
        <ul className="wrapper-cards-list">
          {filteredCards.map((card, index) => (
            <li>
              <HomeCard
                key={`${card.slugUrl}-${index}`}
                {...card}
              />
            </li>
          ))}
        </ul>
      </HorizontalScroll>
    </section>
  );
}

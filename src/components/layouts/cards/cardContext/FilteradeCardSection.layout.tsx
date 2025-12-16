"use client";

import { useState } from "react";
import FilterCards from "@/src/components/ui/buttons/filters/CardCategoryFilter.ui";
import HomeCard from "@/src/components/ui/cards/HomeCard.ui";
import { HomeCardProps } from "@/src/contracts/types/cards/responses.type";

export default function FilteradeCardSection({
  cards,
}: {
  cards: HomeCardProps[];
}) {
  const [filteredCards, setFilteredCards] = useState<HomeCardProps[]>(cards);

  return (
    <section className="wrapper-cards-container">
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

      <div className="wrapper-cards-list no-scrollbar">
        {filteredCards.map((card, index) => (
          <HomeCard
            key={`${card.slugUrl}-${index}`}
            {...card}
          />
        ))}
      </div>
    </section>
  );
}


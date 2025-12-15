import HomeCard from "@/src/components/ui/cards/HomeCard.ui"
import { HomeCards } from "@/src/contracts/types/cards/payloads.types"
import { createFetcher } from "@/src/utils/fetchData"

export default async function CardWrapperSSR({ query }: { query: string }) {
  const fetchCardCategory = createFetcher<undefined, HomeCards[]>(
    query,
    { method: "GET", isPublic: true, raw: true }
  )

  const cards = await fetchCardCategory()
  if (!cards || !Array.isArray(cards)) return null

  return (

    <div className="wrapper-cards-container">
      <div className="wrapper-cards-header tipografy-title">
        <h3 className="wrapper-cards-title">Recém Publicados</h3>
        <p className="wrapper-cards-subtitle">
          HOJE! <span className="wrapper-cards-badge" />
        </p>
      </div>
      <div className="wrapper-cards-list no-scrollbar">
        {cards.map((card, index) => (
          <HomeCard key={`Card ${query + index}`} {...card} />
        ))}
      </div>
    </div>
  )
}


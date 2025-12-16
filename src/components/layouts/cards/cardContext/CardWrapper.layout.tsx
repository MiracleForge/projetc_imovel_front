'use client'


import { useEffect, useState } from 'react'
import HomeCard from "@/src/components/ui/cards/HomeCard.ui"
import { HomeCards } from "@/src/contracts/types/cards/payloads.types"
import { createFetcher } from "@/src/utils/fetchData"
import WrapperCardSkeleton from './CardWrapper.skeleton'


export default function CardWrapper({ query }: { query: string }) {
  const [cards, setCards] = useState<HomeCards[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCards = async () => {
      const fetchCardCategory = createFetcher<undefined, HomeCards[]>(
        query,
        { method: 'GET', isPublic: true, raw: true }
      )
      const response = await fetchCardCategory()
      setCards(Array.isArray(response) ? response : null)
      setLoading(false) // 🎯 FALTAVA ISSO!
    }
    fetchCards()
  }, [query])

  if (loading) return <WrapperCardSkeleton />
  if (!cards) return null

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
          <HomeCard key={`card-${index}`} {...card} />
        ))}
      </div>
    </div>
  )
}

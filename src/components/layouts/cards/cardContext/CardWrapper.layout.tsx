'use client'
import { useEffect, useState } from 'react'
import HomeCard from "@/src/components/ui/cards/HomeCard.ui"
import { HomeCards } from "@/src/contracts/types/cards/payloads.types"
import { createFetcher } from "@/src/utils/fetchData"
import CardSkeleton from "@/src/components/ui/cards/HomeCardSkeleton.cards"

interface CardWrapperProps {
  query: string
}

export default function CardWrapper({ query }: CardWrapperProps) {
  const [cards, setCards] = useState<HomeCards[] | null>(null)

  console.log('🔵 CardWrapper render:', { query, hasCards: !!cards }) // DEBUG

  useEffect(() => {
    console.log('🔥 useEffect executando fetch...') // DEBUG
    const fetchCards = async () => {
      const fetchCardCategory = createFetcher<undefined, HomeCards[]>(
        query,
        { method: 'GET', isPublic: true, raw: true }
      )
      const response = await fetchCardCategory()
      console.log('✅ Fetch concluído:', response ? 'com dados' : 'sem dados') // DEBUG
      setCards(Array.isArray(response) ? response : null)
    }
    fetchCards()
  }, [query])

  if (!cards) {
    console.log('⏳ Mostrando skeleton...') // DEBUG
    return (
      <div className="wrapper-cards-container animate-pulse">
        <div className="wrapper-cards-header">
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="wrapper-cards-list">
          {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  console.log('🎉 Renderizando cards!', cards.length) // DEBUG

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

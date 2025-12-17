'use client'

import { useEffect, useState } from 'react'
import { createFetcher } from "@/src/utils/fetchData"
import SectionCardSkeleton from './SectionCard.skeleton'
import { HomeCardProps } from '@/src/contracts/types/cards/responses.type'
import HomeCard from '@/src/components/ui/cards/HomeCard.ui'
import HorizontalScroll from '@/src/components/context/ResponsiveHorizontalScroll.context'

export default function CardWrapper({ query }: { query: string }) {
  const [cards, setCards] = useState<HomeCardProps[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCards = async () => {
      const fetchCardCategory = createFetcher<undefined, HomeCardProps[]>(
        query,
        { method: 'GET', isPublic: true, raw: true }
      )
      const response = await fetchCardCategory()
      setCards(Array.isArray(response) ? response : null)
      setLoading(false)
    }
    fetchCards()
  }, [query])

  if (loading) return <SectionCardSkeleton />
  if (!cards) return null

  return (
    <div className="wrapper-cards-container">
      <div className="wrapper-cards-header tipografy-title">
        <h3 className="wrapper-cards-title">Recém Publicados</h3>
        <p className="wrapper-cards-subtitle">
          HOJE! <span className="wrapper-cards-badge" />
        </p>
      </div>
      <HorizontalScroll>
        <ul className=" wrapper-cards-list w-full no-scrollbar">
          {cards.map((card, index) => (
            <HomeCard
              key={`${card.slugUrl}-${index}`}
              {...card}
            />
          ))}
        </ul>
      </HorizontalScroll>
    </div>
  )
}

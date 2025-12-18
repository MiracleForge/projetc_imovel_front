'use client'

import incrementLink from '@/src/app/actions/incrementLink.actions'
import { useState } from 'react'

export default function LikeButton({ initialState }: { initialState: boolean }) {
  const [liked, setLiked] = useState<boolean>(initialState)
  const iconPath = liked ? "/miscellaneous/full-heart.svg" : "/miscellaneous/empty-heart.svg"

  return (
    <button
      className='absolute top-1 right-1 bg-white p-2 rounded-full active:scale-[0.95] z-10'
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const liked = await incrementLink()
        setLiked(liked)
      }}
    >
      <img src={iconPath} width={12} height={12} />
    </button>
  )
}

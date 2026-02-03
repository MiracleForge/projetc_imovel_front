'use client'

import Image from 'next/image'
import { useEffect, useCallback } from 'react'

interface CarouselAdvertiserProps {
  src: string[];
  startIndex: number;
  alt: string;
  setIndex: (startIndex: number) => void;
  onClose: () => void;
}

export default function CarouselAdvertiser({ src, startIndex, alt, setIndex, onClose }: CarouselAdvertiserProps) {
  const containerClasses =
    'fixed inset-0 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-90 z-40'

  const handleEscPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleEscPress)
    return () => window.removeEventListener('keydown', handleEscPress)
  }, [handleEscPress])

  return (
    <div className={containerClasses}>
      <div className="relative aspect-square lg:aspect-auto w-full lg:w-3/4 lg:h-3/4" onClick={onClose}>
        <Image
          src={src[startIndex]}
          alt={alt}
          fill
          className="object-contain rounded-lg"
          sizes="(max-width: 768px) 100vw, 75vw"
        />

      </div>

      <div className="w-full px-4">
        <div className="flex gap-3 overflow-x-auto overflow-y-hidden whitespace-nowrap
    "
        >
          {src.map((img, index) => (
            <button
              key={index}
              onClick={() => setIndex(index)}
              className="relative shrink-0 w-24 h-20 md:w-32 md:h-24"
            >
              <Image
                src={img}
                alt={alt}
                fill
                className="object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


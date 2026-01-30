'use client'

import Image from 'next/image'
import { useEffect, useCallback } from 'react'

interface CarouselAdvertiserProps {
  src: string[];
  startIndex: number;
  alt: string;
  onClose: () => void;
}

export default function CarouselAdvertiser({ src, startIndex, alt, onClose }: CarouselAdvertiserProps) {
  const containerClasses =
    'fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-40'

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
    <div className={containerClasses} onClick={onClose}>
      <div className="relative w-3/4 h-3/4">
        <Image
          src={src[startIndex]}
          alt={alt}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 75vw"
        />
      </div>
    </div>
  )
}


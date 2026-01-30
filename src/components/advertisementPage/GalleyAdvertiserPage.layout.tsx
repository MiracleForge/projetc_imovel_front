"use client"

import { Activity, useState } from "react"
import dynamic from "next/dynamic"
import LargeDisplay from "../layouts/Previews/LargeImageDisplay.preview"
import SmallDisplay from "../layouts/banners/SmallDisplay.layout"

const CarouselAdvertiser = dynamic(
  () => import("@/src/components/layouts/Previews/CarouselAdvertiser.layout"),
  { ssr: false }
)

interface GalleryAdvertizerPageProps {
  images: string[]
  title: string
}


export function GalleryAdvertizerPage({ images, title }: GalleryAdvertizerPageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [indexToOpen, setIndex] = useState<number>(0)

  return (
    <>
      <figure
        className="flex flex-col md:flex-row gap-4 items-stretch w-full"
        itemProp="image"
        aria-label={`Galeria de imagens do anúncio: ${title}`}
      >
        <nav
          aria-label="Miniaturas da galeria de imagens"
          className="order-2 md:order-1"
        >
          <ul className="grid grid-cols-2 lg:grid-cols-1 gap-4" role="list">
            {images.slice(1, 6).map((img, index) => (
              <li
                key={img}
                role="listitem"
                className={index === 4 ? "hidden xl:block" : ""}
              >
                <GalleryImageButton
                  isOpen={isOpen}
                  ariaLabel={`Abrir imagem ${index + 2} da galeria`}
                  onOpen={() => {
                    setIndex(index + 1)
                    setIsOpen(true)
                  }}
                >
                  <SmallDisplay
                    src={img}
                    alt={`${title} - miniatura ${index + 2}`}
                  />
                </GalleryImageButton>
              </li>
            ))}
          </ul>
        </nav>

        <GalleryImageButton
          isOpen={isOpen}
          ariaLabel="Abrir galeria de imagens em tela cheia"
          onOpen={() => {
            setIndex(0)
            setIsOpen(true)
          }}
          className="flex-1 order-1 md:order-2"
        >
          <LargeDisplay src={images[0]} alt={`${title} - imagem principal`} />
        </GalleryImageButton>

        <figcaption className="sr-only">
          Galeria de imagens do anúncio: {title}
        </figcaption>
      </figure>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        <CarouselAdvertiser
          src={images}
          alt={title}
          startIndex={indexToOpen}
          onClose={() => setIsOpen(false)}
        />
      </Activity>
    </>
  )
}


interface GalleryImageButtonProps {
  onOpen: () => void
  ariaLabel: string
  children: React.ReactNode
  isOpen: boolean
  className?: string
}

function GalleryImageButton({
  onOpen,
  ariaLabel,
  children,
  isOpen,
  className
}: GalleryImageButtonProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secundary-blue cursor-pointer ${className ?? ""}`}
    >
      {children}
    </button>
  )
}



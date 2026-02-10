"use client"
import { Activity, useState } from "react"
import { GalleryImageButton } from "../../ui/buttons/GalleryImageButton.ui"
import dynamic from "next/dynamic"
import LargeDisplay from "../Previews/LargeImageDisplay.preview"
import SmallDisplay from "../banners/SmallDisplay.layout"

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
      <figure className="flex flex-col md:flex-row gap-4 w-full">

        <nav className="order-2 md:order-1 md:w-56 md:min-w-56  shrink-0">
          <ul className="grid grid-cols-2 md:grid-cols-1 gap-4 w-full">
            {images.slice(1, 5).map((img, index) => (
              <li key={img}>
                <GalleryImageButton
                  isOpen={isOpen}
                  ariaLabel={`Abrir imagem ${index + 2}`}
                  onOpen={() => {
                    setIndex(index + 1)
                    setIsOpen(true)
                  }}
                >
                  <SmallDisplay
                    src={img}
                    alt={`${title} - miniatura ${index + 2}`}
                    fallback="/placeholders/imagem-do-anuncio-indisponivel.webp"
                  />
                </GalleryImageButton>
              </li>
            ))}
          </ul>
        </nav>

        <GalleryImageButton
          isOpen={isOpen}
          ariaLabel="Abrir galeria"
          onOpen={() => {
            setIndex(0)
            setIsOpen(true)
          }}
          className="order-1 md:order-2 flex-1 min-w-0"
        >
          <LargeDisplay
            src={images[0]}
            alt={`${title} - imagem principal`}
            fallback=""
          />
        </GalleryImageButton>

      </figure>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        <CarouselAdvertiser
          src={images}
          alt={title}
          startIndex={indexToOpen}
          setIndex={setIndex}
          onClose={() => setIsOpen(false)}
          fallback="/placeholders/imagem-do-anuncio-indisponivel.webp"
        />
      </Activity>
    </>
  )
}


"use client"
import { Activity, useState } from "react"
import { GalleryImageButton } from "../ui/buttons/GalleryImageButton.ui"
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
      <figure className="grid grid-cols-[auto_1fr] auto-rows-fr gap-4 w-full">
        <nav className="row-span-4">
          <ul className="grid grid-rows-4 gap-4 h-full">
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
                    fallback="/miscellaneous/user-avatar.svg"
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
          className="row-span-4"
        >
          <LargeDisplay src={images[0]} alt={`${title} - imagem principal`} />
        </GalleryImageButton>
      </figure>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        <CarouselAdvertiser
          src={images}
          alt={title}
          startIndex={indexToOpen}
          setIndex={setIndex}
          onClose={() => setIsOpen(false)}
        />
      </Activity>
    </>
  )
}




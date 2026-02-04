"use client";

import { useState, Activity } from "react";
import dynamic from "next/dynamic";
import SmallDisplay from "../layouts/banners/SmallDisplay.layout";
import { GalleryImageButton } from "../ui/buttons/GalleryImageButton.ui";

type UrlMaxArray = readonly [] | readonly [string] | readonly [string, string];

const CarouselAdvertiser = dynamic(
  () => import("@/src/components/layouts/Previews/CarouselAdvertiser.layout"),
  { ssr: false }
);

export function GalleryPlanAdvertisePage({
  title,
  plans
}: {
  title: string;
  plans: UrlMaxArray;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [indexToOpen, setIndex] = useState(0);

  const images: string[] =
    plans.length === 0
      ? [
        "/miscellaneous/planta-casa-placeholder.png",
        "/miscellaneous/planta-casa-placeholder.png"
      ]
      : [...plans];

  return (
    <>
      <div className="inline-flex gap-2 min-w-fit h-42">
        {images.map((url, index) => (
          <GalleryImageButton
            key={`planImg-${index}`}
            ariaLabel={`Abrir planta ${index + 1}`}
            isOpen={isOpen}
            onOpen={() => {
              setIndex(index);   // 👈 índice correto
              setIsOpen(true);
            }}
          >
            <SmallDisplay
              src={url}
              alt={`Planta do imóvel ${title}`}
            />
          </GalleryImageButton>
        ))}
      </div>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        <CarouselAdvertiser
          src={images}
          startIndex={indexToOpen}
          alt={title}
          setIndex={setIndex}
          onClose={() => setIsOpen(false)}
        />
      </Activity>
    </>
  );
}


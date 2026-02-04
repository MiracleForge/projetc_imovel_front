"use client";

import { useState, useMemo, useCallback, Activity } from "react";
import dynamic from "next/dynamic";
import SmallDisplay from "../layouts/banners/SmallDisplay.layout";
import { GalleryImageButton } from "../ui/buttons/GalleryImageButton.ui";

type UrlMaxArray = readonly [] | readonly [string] | readonly [string, string];

const PLACEHOLDER_IMAGE = "/miscellaneous/planta-casa-placeholder.png";

const CarouselAdvertiser = dynamic(
  () => import("@/src/components/layouts/Previews/CarouselAdvertiser.layout"),
  { ssr: false }
);

type GalleryPlanAdvertisePageProps = {
  title: string;
  plans: UrlMaxArray;
};

export function GalleryPlanAdvertisePage({
  title,
  plans
}: GalleryPlanAdvertisePageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [indexToOpen, setIndex] = useState(0);

  const images = useMemo<string[]>(() => {
    return plans.length === 0
      ? [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE]
      : [...plans];
  }, [plans]);

  const openAt = useCallback((index: number) => {
    setIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <div
        className="inline-flex gap-2 min-w-fit h-42"
        role="list"
        aria-label="Plantas do imóvel"
      >
        {images.map((url, index) => (
          <GalleryImageButton
            key={`planImg-${index}`}
            ariaLabel={`Abrir planta ${index + 1}`}
            isOpen={isOpen}
            onOpen={() => openAt(index)}
          >
            <SmallDisplay
              src={url}
              alt={`Planta do imóvel ${title}`}
              fallback={PLACEHOLDER_IMAGE}
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
          onClose={close}
        />
      </Activity>
    </>
  );
}


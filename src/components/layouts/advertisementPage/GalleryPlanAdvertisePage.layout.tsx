"use client";

import { useState, useMemo, useCallback, Activity } from "react";
import dynamic from "next/dynamic";
import SmallDisplay from "../banners/SmallDisplay.layout";
import { GalleryImageButton } from "../../ui/buttons/GalleryImageButton.ui";

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
    const validPlans = plans.filter(
      (url): url is string => typeof url === "string" && url.trim() !== ""
    );

    return validPlans.length > 0
      ? validPlans
      : [PLACEHOLDER_IMAGE];
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
        className="shrink-0 flex flex-col md:flex-row md:inline-flex min-w-fit gap-6"
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
            <div className="relative min-w-0 lg:w-56">
              <SmallDisplay
                src={url}
                alt={`Planta do imóvel ${title}`}
                fetchPriority="low"
                fallback={PLACEHOLDER_IMAGE}
              />
            </div>
          </GalleryImageButton>
        ))}
      </div>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        <CarouselAdvertiser
          src={images}
          startIndex={indexToOpen}
          fallback="/miscellaneous/planta-casa-placeholder.png"
          alt={title}
          setIndex={setIndex}
          onClose={close}
        />
      </Activity>
    </>
  );
}


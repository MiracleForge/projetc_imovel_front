"use client";

import { useRef, useEffect, useCallback, memo } from "react";
import { heroCarrouselData } from "@/src/data/heroCarousel.data";
import Image from "next/image";

export default function HeroBannerCarousel() {
  const carouselRef = useRef<HTMLUListElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const width = el.clientWidth;
    const lastIndex = heroCarrouselData.length - 1;
    const isLast = el.scrollLeft >= width * lastIndex;

    el.scrollTo({
      left: isLast ? 0 : el.scrollLeft + width,
      behavior: "smooth",
    });
  }, []);

  const prevSlide = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const width = el.clientWidth;
    const first = el.scrollLeft === 0;
    const lastIndex = heroCarrouselData.length - 1;

    el.scrollTo({
      left: first ? width * lastIndex : el.scrollLeft - width,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const startAutoplay = () => {
      intervalRef.current = setInterval(nextSlide, 4500);
    };

    const stopAutoplay = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    startAutoplay();

    const handleVisibility = () => {
      document.hidden ? stopAutoplay() : startAutoplay();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopAutoplay();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [nextSlide]);

  return (
    <div className="relative w-full aspect-3/1 md:aspect-4/1 overflow-hidden">
      <CarouselSlides carouselRef={carouselRef} />

      <CarouselButton onClick={prevSlide} position="left" rotate />
      <CarouselButton onClick={nextSlide} position="right" />
    </div>
  );
}


const CarouselButton = memo(function CarouselButton({
  onClick,
  position,
  rotate,
}: {
  onClick: () => void;
  position: "left" | "right";
  rotate?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`absolute hidden md:block ${position === "left" ? "left-4" : "right-4"
        } top-1/2 -translate-y-1/2 p-3 bg-[#F5F5F5] hover:bg-foreground hover:scale-110 rounded-full z-10`}
    >
      <Image
        src="/miscellaneous/arrow-vector.svg"
        alt=""
        width={16}
        height={16}
        priority={false}
        className={rotate ? "rotate-180" : ""}
      />
    </button>
  );
});


const CarouselItem = memo(function CarouselItem({
  url,
  index,
}: {
  url: string;
  index: number;
}) {
  return (
    <li className="snap-center shrink-0 w-full h-full relative">
      <Image
        src={url}
        alt="Banner promocional"
        fill
        priority={index === 0}
        quality={75}
        loading={index === 0 ? "eager" : "lazy"}
        sizes="100vw"
        style={{ objectFit: "contain" }}
      />
    </li>
  );
});

function CarouselSlides({
  carouselRef,
}: {
  carouselRef: React.RefObject<HTMLUListElement | null>;
}) {
  return (
    <ul
      ref={carouselRef}
      className="flex overflow-x-scroll snap-x snap-mandatory w-full h-full no-scrollbar list-none m-0 p-0 relative touch-pan-x"
    >
      {heroCarrouselData.map((item, index) => (
        <CarouselItem key={index} url={item.url} index={index} />
      ))}
    </ul>
  );
};

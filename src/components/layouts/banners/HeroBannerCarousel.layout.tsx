"use client";

import { useRef, useEffect, useCallback, memo, useState } from "react";
import { heroCarrouselData } from "@/src/data/heroCarousel.data";
import Image from "next/image";

export default function HeroBannerCarousel() {
  const carouselRef = useRef<HTMLUListElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  const total = heroCarrouselData.length - 1;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
      intervalRef.current = setInterval(nextSlide, 6000);
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

  useEffect(() => {
    if (isMobile) return;

    const el = carouselRef.current;
    if (!el) return;

    const handleScroll = () => {
      const width = el.clientWidth;
      const index = Math.round(el.scrollLeft / width);
      setCurrentIndex(index);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  if (heroCarrouselData.length === 0) return;
  return (
    <div className="relative w-full aspect-3/1 md:aspect-4/1 overflow-hidden">
      <CarouselSlides carouselRef={carouselRef} />

      {isMobile !== null && !isMobile && heroCarrouselData.length !== 1 && (
        <>
          <CarouselButton onClick={prevSlide} position="left" rotate />
          <CarouselButton onClick={nextSlide} position="right" />
          <CarouselIndicator
            total={heroCarrouselData.length}
            currentIndex={currentIndex}
            carouselRef={carouselRef}
            isMobile={isMobile}
          />
        </>
      )}
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


function CarouselIndicator({
  total,
  currentIndex,
  carouselRef,
}: {
  total: number;
  currentIndex: number;
  carouselRef: React.RefObject<HTMLUListElement | null>;
  isMobile: boolean | null
}) {

  const goToSlide = useCallback((index: number) => {
    const el = carouselRef.current;
    if (!el) return;

    const width = el.clientWidth;
    el.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="absolute bottom-6 inset-x-0 flex justify-center space-x-1">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`rounded-full transition-all bg-white border border-secundary-blue
            ${currentIndex === index ? "h-2 w-8 " : "h-2 w-6"}`}
        ></button>
      ))}
    </div>
  );
}


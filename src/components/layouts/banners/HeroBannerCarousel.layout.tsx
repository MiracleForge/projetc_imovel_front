"use client";

import { useRef, useEffect, useCallback, memo, useState } from "react";
import { heroCarrouselData } from "@/src/data/heroCarousel.data";
import Image from "next/image";

export default function HeroBannerCarousel() {
  const carouselRef = useRef<HTMLUListElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  // Detecção de mobile otimizada
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
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

  const goToSlide = useCallback((index: number) => {
    const el = carouselRef.current;
    if (!el) return;

    // Reinicia o autoplay ao navegar manualmente
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(nextSlide, 6000);
    }

    const width = el.clientWidth;
    el.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
  }, [nextSlide]);

  // Autoplay com pausa em janela inativa
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

  // Atualiza índice atual baseado no scroll
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

  if (heroCarrouselData.length === 0) return null;

  const showControls = isMobile !== null && !isMobile && heroCarrouselData.length > 1;

  return (
    <div
      className="relative w-full aspect-3/1 md:aspect-4/1 overflow-hidden"
      role="region"
      aria-label="Carrossel de banners promocionais"
      aria-live="polite"
    >
      <CarouselSlides carouselRef={carouselRef} />

      {showControls && (
        <>
          <CarouselButton
            onClick={prevSlide}
            position="left"
            rotate
            label="Slide anterior"
          />
          <CarouselButton
            onClick={nextSlide}
            position="right"
            label="Próximo slide"
          />
          <CarouselIndicator
            total={heroCarrouselData.length}
            currentIndex={currentIndex}
            onSlideChange={goToSlide}
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
  label,
}: {
  onClick: () => void;
  position: "left" | "right";
  rotate?: boolean;
  label: string;
}) {
  const positionClass = position === "left" ? "left-4" : "right-4";

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`absolute hidden md:block ${positionClass} top-1/2 -translate-y-1/2 
        p-3 bg-[#F5F5F5] hover:bg-foreground hover:scale-110 
        rounded-full z-10 transition-transform duration-200`}
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
      className="flex overflow-x-auto snap-x snap-mandatory w-full h-full 
        no-scrollbar list-none m-0 p-0 relative touch-pan-x"
    >
      {heroCarrouselData.map((item, index) => (
        <CarouselItem key={index} url={item.url} index={index} />
      ))}
    </ul>
  );
}

function CarouselIndicator({
  total,
  currentIndex,
  onSlideChange,
}: {
  total: number;
  currentIndex: number;
  onSlideChange: (index: number) => void;
}) {
  return (
    <div
      className="absolute bottom-6 inset-x-0 flex justify-center gap-2"
      role="tablist"
      aria-label="Slides do carrossel"
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = currentIndex === index;

        return (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            role="tab"
            aria-selected={isActive}
            aria-label={`Ir para slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 bg-white 
              border border-secundary-blue hover:opacity-100
              ${isActive
                ? "h-2 w-8 opacity-100"
                : "h-2 w-6 opacity-60"
              }`}
          />
        );
      })}
    </div>
  );
}

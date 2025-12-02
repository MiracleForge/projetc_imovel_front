import { heroCarrouselData } from "@/src/data/herroCarousel.data";
import Image from "next/image";

export default function HeroBanner() {


  return (
    <div className="relative w-full h-[190px] sm:h-[260px] md:h-[330px] lg:h-[420px] xl:h-[495px]">

      {heroCarrouselData.map((item, index) => (
        < Image
          src="/banners/current-hero-banner.png"
          alt="Imagem promocional destacando a inauguração especial do site"
          role="img"
          aria-label="Banner da inauguração especial do site com destaque visual em alta resolução"
          fill
          priority
          fetchPriority="high"
          quality={90}
          sizes="
      (max-width: 640px) 100vw,
      (max-width: 1024px) 100vw,
      100vw
      "
          loading="eager"
          decoding="async"
          style={{ objectFit: "cover" }}
        />

      ))}
    </div>
  );
}


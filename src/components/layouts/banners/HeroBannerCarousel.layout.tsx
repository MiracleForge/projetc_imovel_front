import { heroCarrouselData } from "@/src/data/heroCarousel.data";
import Image from "next/image";

export default function HeroBannerCarousel() {
  return (
    <ul className="hero-carousel flex overflow-x-auto snap-x snap-mandatory w-full aspect-4/1 relative no-scrollbar m-0 p-0 list-none">
      {heroCarrouselData.map((item, index) => (
        <li
          key={index}
          className="snap-center shrink-0 w-full h-full relative"
        >
          <Image
            src={item.url}
            alt="Imagem promocional destacando a inauguração especial do site"
            role="img"
            aria-label="Banner da inauguração especial do site com destaque visual em alta resolução"
            fill
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            quality={75}
            sizes="100vw"
            loading="eager"
            decoding="async"
            style={{ objectFit: "contain" }}
          />
        </li>
      ))}
    </ul>
  );
}


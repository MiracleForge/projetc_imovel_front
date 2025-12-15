import { Suspense } from "react";
import LazyLoadWrapper from "@/src/components/context/LazyLoadWrapper.client";
import HeroBannerCarousel from "@/src/components/layouts/banners/HeroBannerCarousel.layout";
import CardWrapperSSR from "@/src/components/layouts/cards/cardContext/CardWrapperSSR.layout";
import MySpace from "@/src/components/layouts/features/MySpace.layout";
import SectionFeature from "@/src/components/layouts/features/SectionFeature.layout";
import CategoryNav from "@/src/components/layouts/headers/CategoryNav.header";
import CardSkeleton from "@/src/components/ui/cards/HomeCardSkeleton.cards";
import CardWrapper from "@/src/components/layouts/cards/cardContext/CardWrapper.layout";

function WrapperCardSkeleton() {
  return (
    <div className="wrapper-cards-container animate-pulse">
      <div className="wrapper-cards-header">
        <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="wrapper-cards-list">
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col bg-white px-2 py-3 lg:space-y-12">
      <CategoryNav />
      <HeroBannerCarousel />

      {/* Primeiro card - SSR direto com Suspense */}
      <Suspense fallback={<WrapperCardSkeleton />}>
        <CardWrapperSSR query="http://localhost:3000/api/casas" />
      </Suspense>

      {/* Cards lazy - só renderiza quando entrar na viewport */}
      <LazyLoadWrapper>
        <CardWrapper query="http://localhost:3000/api/cards" />
      </LazyLoadWrapper>

      <LazyLoadWrapper>
        <CardWrapper query="http://localhost:3000/api/lofts" />
      </LazyLoadWrapper>

      <MySpace />

      <LazyLoadWrapper>
        <CardWrapper query="http://localhost:3000/api/apartamentos" />
      </LazyLoadWrapper>

      <LazyLoadWrapper>
        <CardWrapper query="http://localhost:3000/api/coberturas" />
      </LazyLoadWrapper>

      <LazyLoadWrapper>
        <CardWrapper query="http://localhost:3000/api/casas" />
      </LazyLoadWrapper>

      <SectionFeature />
    </main>
  );
}

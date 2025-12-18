import { Suspense } from "react";
import LazyLoadWrapper from "@/src/components/context/LazyLoadWrapper.client";
import HeroBannerCarousel from "@/src/components/layouts/banners/HeroBannerCarousel.layout";
import MySpace from "@/src/components/layouts/features/MySpace.layout";
import SectionFeature from "@/src/components/layouts/features/SectionFeature.layout";
import CategoryNav from "@/src/components/layouts/headers/CategoryNav.header";
import dynamic from "next/dynamic";
import CardSectionServer from "@/src/components/layouts/cards/cardSections/CardSectionServer.layout";
import SectionCardSkeleton from "@/src/components/layouts/cards/cardSections/SectionCard.skeleton";
import RegionEmptyState from "@/src/components/layouts/stateZero/RegionEmptyState.layout";

const CardWrapper = dynamic(
  () => import("@/src/components/layouts/cards/cardSections/CardWrapper.layout"),
);


export default function Home() {
  return (
    <main className="flex flex-col bg-white px-2 py-3 lg:space-y-6">
      <CategoryNav />
      <HeroBannerCarousel />

      <Suspense fallback={<SectionCardSkeleton />}>
        <CardSectionServer />
      </Suspense>

      <RegionEmptyState />

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

import CategoryNav from "@/src/components/layouts/headers/CategoryNav.header";
import FecherSSR from "@/src/components/wrappers/FecherSSR.wrapper";
import HeroBannerCarousel from "@/src/components/layouts/banners/HeroBannerCarousel.layout";
import LazyLoadWrapper from "@/src/components/wrappers/LazyLoadWrapper.wrapper";
import MySpace from "@/src/components/layouts/features/MySpace.layout";
import RegionEmptyState from "@/src/components/layouts/stateZero/RegionEmptyState.layout";
import SectionCardSkeleton from "@/src/components/layouts/cards/cardSections/HorizontalCardSection.skeleton";
import SectionFeature from "@/src/components/layouts/features/SectionFeature.layout";
import { Suspense } from "react";

import dynamic from "next/dynamic";
const FecherClient = dynamic(
  () => import("@/src/components/wrappers/FecherClient.wrapper"),
);


export default function Home() {
  return (
    <main className="flex flex-col bg-white px-2 py-3 lg:space-y-6">
      <CategoryNav />
      <HeroBannerCarousel />

      <Suspense fallback={<SectionCardSkeleton />}>
        <FecherSSR />
      </Suspense>

      <RegionEmptyState />

      <LazyLoadWrapper>
        <FecherClient query="http://localhost:3000/api/cards" />
      </LazyLoadWrapper>

      <LazyLoadWrapper>
        <FecherClient query="http://localhost:3000/api/lofts" />
      </LazyLoadWrapper>

      <MySpace />

      <LazyLoadWrapper>
        <FecherClient query="http://localhost:3000/api/apartamentos" />
      </LazyLoadWrapper>

      <LazyLoadWrapper>
        <FecherClient query="http://localhost:3000/api/coberturas" />
      </LazyLoadWrapper>

      <LazyLoadWrapper>
        <FecherClient query="http://localhost:3000/api/casas" />
      </LazyLoadWrapper>

      <SectionFeature />
    </main>
  );
}

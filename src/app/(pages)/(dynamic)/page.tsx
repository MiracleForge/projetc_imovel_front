import { Suspense } from "react";
import LazyLoadWrapper from "@/src/components/context/LazyLoadWrapper.client";
import HeroBannerCarousel from "@/src/components/layouts/banners/HeroBannerCarousel.layout";
import CardWrapperSSR from "@/src/components/layouts/cards/cardContext/CardWrapperSSR.layout";
import MySpace from "@/src/components/layouts/features/MySpace.layout";
import SectionFeature from "@/src/components/layouts/features/SectionFeature.layout";
import CategoryNav from "@/src/components/layouts/headers/CategoryNav.header";
import dynamic from "next/dynamic";
import WrapperCardSkeleton from "@/src/components/layouts/cards/cardContext/CardWrapper.skeleton";

const CardWrapper = dynamic(
  () => import("@/src/components/layouts/cards/cardContext/CardWrapper.layout"),
);



export default function Home() {
  return (
    <main className="flex flex-col bg-white px-2 py-3 lg:space-y-12">
      <CategoryNav />
      <HeroBannerCarousel />

      <Suspense fallback={<WrapperCardSkeleton />}>
        <CardWrapperSSR query="http://localhost:3000/api/cards" />
      </Suspense>

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

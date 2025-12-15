import dynamic from "next/dynamic";
import LazyLoadWrapper from "@/src/components/context/LazyLoadWrapper.client";
import HeroBannerCarousel from "@/src/components/layouts/banners/HeroBannerCarousel.layout";
import CardWrapperSSR from "@/src/components/layouts/cards/cardContext/CardWrapperSSR.layout";
import MySpace from "@/src/components/layouts/features/MySpace.layout";
import SectionFeature from "@/src/components/layouts/features/SectionFeature.layout";
import CategoryNav from "@/src/components/layouts/headers/CategoryNav.header";

const CardWrapper = dynamic(() => import('@/src/components/layouts/cards/cardContext/CardWrapper.layout'), { ssr: false })


export default function Home() {
  return (
    <main className="flex flex-col  bg-white px-2 py-3 lg:space-y-12">

      <CategoryNav />

      <HeroBannerCarousel />

      <CardWrapperSSR query="https://free.mockerapi.com/mock/b148a58f-c286-4328-8c75-75ad20c7a71d" />

      <LazyLoadWrapper>
        <CardWrapper
          query="https://free.mockerapi.com/mock/d7880ddb-03d4-45ee-8928-ec06a1f1b451"
        />
      </LazyLoadWrapper>

      <LazyLoadWrapper>
        <CardWrapper
          query="https://free.mockerapi.com/mock/246de9cb-e66d-4632-b4df-32072cadd1bb"
        />
      </LazyLoadWrapper>

      <MySpace />
      <LazyLoadWrapper>
        <CardWrapper
          query="https://free.mockerapi.com/mock/ff19df97-1f6f-42e5-bc01-239f165a9727"
        />
      </LazyLoadWrapper>
      <LazyLoadWrapper>
        <CardWrapper
          query="https://free.mockerapi.com/mock/32ca2f5a-8614-4b7c-bd36-12bd2f2ab1fd"
        />
      </LazyLoadWrapper>

      <LazyLoadWrapper>
        <CardWrapper
          query="https://free.mockerapi.com/mock/32ca2f5a-8614-4b7c-bd36-12bd2f2ab1fd"
        />
      </LazyLoadWrapper>

      <SectionFeature />

    </main>

  );
}

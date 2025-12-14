import HeroBannerCarousel from "@/src/components/layouts/banners/HeroBannerCarousel.layout";
import CardWrapper from "@/src/components/layouts/cards/cardContext/CardWrapper.layout";
import MySpace from "@/src/components/layouts/features/MySpace.layout";
import SectionFeature from "@/src/components/layouts/features/SectionFeature.layout";
import CategoryNav from "@/src/components/layouts/headers/CategoryNav.header";

export default function Home() {
  return (
    <main className="flex flex-col  bg-white px-2 py-3 lg:space-y-12">

      <CategoryNav />

      <HeroBannerCarousel />

      <CardWrapper lazyLoading={false} query="https://free.mockerapi.com/mock/b148a58f-c286-4328-8c75-75ad20c7a71d" />

      <CardWrapper lazyLoading query="https://free.mockerapi.com/mock/32ca2f5a-8614-4b7c-bd36-12bd2f2ab1fd" />

      <MySpace />

      <CardWrapper lazyLoading query="https://free.mockerapi.com/mock/32ca2f5a-8614-4b7c-bd36-12bd2f2ab1fd" />

      <CardWrapper lazyLoading query="https://free.mockerapi.com/mock/32ca2f5a-8614-4b7c-bd36-12bd2f2ab1fd" />
      <CardWrapper lazyLoading query="https://free.mockerapi.com/mock/32ca2f5a-8614-4b7c-bd36-12bd2f2ab1fd" />
      <SectionFeature />

    </main>

  );
}

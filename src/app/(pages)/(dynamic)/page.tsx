import HeroBannerCarousel from "@/src/components/layouts/banners/HeroBannerCarousel.layout";
import CardWrapper from "@/src/components/layouts/cards/cardContext/CardWrapper.layout";
import SectionFeature from "@/src/components/layouts/features/SectionFeature.layout";
import CategoryButton from "@/src/components/ui/buttons/CategoryButton.ui";
import { categoryData } from "@/src/data/categoryButtonData.data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  bg-white px-2 py-3 lg:space-y-12">

      <div className="w-full flex lg:justify-self-start space-x-3 flex-nowrap overflow-x-auto scroll-smooth no-scrollbar px-1">
        {categoryData.map((btn, index) => (
          <CategoryButton key={index} label={btn.name} url={btn.url} iconPath={btn.icon} />
        ))}
      </div>

      <HeroBannerCarousel />

      <CardWrapper lazyLoading query="https://free.mockerapi.com/mock/b148a58f-c286-4328-8c75-75ad20c7a71d" />

      <CardWrapper lazyLoading query="https://free.mockerapi.com/mock/32ca2f5a-8614-4b7c-bd36-12bd2f2ab1fd" />

      <CardWrapper lazyLoading query="https://free.mockerapi.com/mock/32ca2f5a-8614-4b7c-bd36-12bd2f2ab1fd" />

      <CardWrapper lazyLoading query="https://free.mockerapi.com/mock/32ca2f5a-8614-4b7c-bd36-12bd2f2ab1fd" />
      <CardWrapper lazyLoading query="https://free.mockerapi.com/mock/32ca2f5a-8614-4b7c-bd36-12bd2f2ab1fd" />
      <SectionFeature />

    </main>

  );
}

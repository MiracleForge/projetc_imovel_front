import HeroBannerCarousel from "@/src/components/layouts/banners/HeroBannerCarousel.layout";
import CardWrapper from "@/src/components/layouts/cards/cardContext/CardWrapper.layout";
import SectionFeature from "@/src/components/layouts/features/SectionFeature.layout";
import CategoryButton from "@/src/components/ui/buttons/CategoryButton.ui";
import PropertyCard from "@/src/components/ui/cards/HomeCard.ui";
import { categoryData } from "@/src/data/categoryButtonData.data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  bg-white px-2 py-3 lg:space-y-12">

      <div className="w-full flex lg:justify-self-start space-x-3 flex-nowrap overflow-x-auto no-scrollbar px-1">
        {categoryData.map((btn, index) => (
          <CategoryButton key={index} label={btn.name} url={btn.url} iconPath={btn.icon} />
        ))}
      </div>

      <HeroBannerCarousel />

      <CardWrapper />

      <SectionFeature />

      <CardWrapper />

    </main>

  );
}

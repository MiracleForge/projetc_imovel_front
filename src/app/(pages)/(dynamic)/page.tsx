import HeroBannerCarousel from "@/src/components/layouts/banners/HeroBannerCarousel.layout";
import CategoryButton from "@/src/components/ui/buttons/CategoryButton.ui";
import { categoryData } from "@/src/data/categoryButtonData.data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-3 space-y-12">

      <div className="w-full flex lg:justify-center space-x-3 flex-nowrap overflow-x-auto no-scrollbar">
        {categoryData.map((btn, index) => (
          <CategoryButton key={index} label={btn.name} url={btn.url} iconPath={btn.icon} />
        ))}
      </div>

      <HeroBannerCarousel />
    </main>

  );
}

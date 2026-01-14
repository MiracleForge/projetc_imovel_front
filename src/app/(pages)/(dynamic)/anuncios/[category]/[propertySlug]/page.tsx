import AdvertisementPage from "@/src/components/advertisementPage/AdvertisementPage.layout";
import AdvertisementSkeleton from "@/src/components/advertisementPage/AdvertiseSkeleton.skeleton";
import { Suspense } from "react";


export type AdvertisePageProps = {
  params: { categoria: string; slug: string };
  searchParams?: { rec?: string; lis?: string };
};

export default function Page(props: AdvertisePageProps) {
  return (
    <main
      itemScope
      itemType="https://schema.org/RealEstateListing"
      className="container mx-auto px-4 py-6"
    >
      <div className="mb-4 rounded bg-green-100 p-3 text-green-900 text-sm">
        ✅ Conteúdo estático da página (header, breadcrumbs, anúncios, etc)
      </div>

      <Suspense fallback={<AdvertisementSkeleton />}>
        <AdvertisementPage {...props} />
      </Suspense>
    </main>
  );
}

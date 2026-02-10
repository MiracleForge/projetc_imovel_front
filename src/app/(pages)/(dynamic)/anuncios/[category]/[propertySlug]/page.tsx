import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import AdvertiseBreadCombs from "@/src/components/ui/steps/AdvertiseBreadCombs.ui";
import AdvertisementPage from "@/src/components/layouts/advertisementPage/AdvertisementPage.layout";
import AdvertisementSkeleton from "@/src/components/layouts/advertisementPage/AdvertiseSkeleton.skeleton";
import { buildAdvertisementMetadata } from "./metadata";
import { getAdvertisementBySlug } from "@/src/dal/adversetiment.dal";

type PageParams = {
  category: string;
  propertySlug: string;
};

export type AdvertisePageProps = {
  params: Promise<PageParams>;
  searchParams?: Promise<{ rec?: string; lis?: string }>;
};


export async function generateMetadata(): Promise<Metadata> {
  const ad = await getAdvertisementBySlug();

  if (!ad) notFound();
  return buildAdvertisementMetadata(ad);
}


export default async function Page({ params }: AdvertisePageProps) {
  const { category, propertySlug } = await params;

  // const headersList = await headers()
  // const userAgent = headersList.get('user-agent')
  //
  // const isMobile = userAgent!.match(
  //   /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  // )

  return (
    <main
      itemScope
      itemType="https://schema.org/RealEstateListing"
      className="container mx-auto  py-6"
    >

      <div className="hidden md:block">
        <AdvertiseBreadCombs category={category} propertySlug={propertySlug} />
      </div>

      <Suspense fallback={<AdvertisementSkeleton />}>
        <AdvertisementPage category={category} />
      </Suspense>
    </main>
  );
}


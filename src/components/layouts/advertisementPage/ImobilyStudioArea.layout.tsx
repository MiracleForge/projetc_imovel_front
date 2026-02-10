import { Suspense } from "react";
import SectionCardSkeleton from "../cards/cardSections/HorizontalCardSection.skeleton";
import FecherSSR from "../../wrappers/FecherSSR.wrapper";
import { StudioEntity } from "@/src/contracts/DTOs/ImobilyStudio/ImobilyStudio.entity.dto";
import { getImobilyStudioResumed } from "@/src/dal/ImobilyStudio.dal";
import ContacInforArea from "./ContacInfoArea.layout";
import Image from "next/image";
import SectionMarketing from "../features/SectionMarketing.layout";

export default async function StudioSectionImproved() {
  const studio: StudioEntity | null = await getImobilyStudioResumed();

  if (!studio) return null;
  return (
    <section className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden">

      <SectionMarketing keys={["verified_sales", "verified_sales", "visibility"]} value={["3", "5", "3"]} simple />
      <div className="relative h-44">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
          className="w-full h-full object-cover"
          fill
          alt={`Banner Studio ${studio.name}`}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-4 left-6 flex items-center gap-4">
          <Image
            src="/miscellaneous/user-avatar.svg"
            alt={`Imagem do ${studio.name} responsável`}
            width={80}
            height={80}
            className="rounded-lg border-4 border-white object-cover bg-white"
          />

          <div className="text-white">
            <h2 className="text-xl font-bold">{studio?.name}</h2>
            <p className="text-xs opacity-80">{studio.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

        <p className="text-sm text-gray-600 max-w-3xl">
          {studio.description}
        </p>

        {/* ACTIONS */}
        <ContacInforArea userActionButton="subscribe" phone="71 98447-4664" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat label={studio.stats.anuncios.label} value={studio.stats.anuncios.value} />
          <Stat label={studio.stats.visualizacoes.label} value={studio.stats.visualizacoes.value} />
          <Stat label={studio.stats.favoritos.label} value={studio.stats.favoritos.value} />
          <Stat label={studio.stats.avaliacao.label} value={studio.stats.avaliacao.value} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              Anúncios do Studio
            </h3>
            <button className="text-sm text-[#5B7FFF] hover:underline">
              Ver todos
            </button>
          </div>


          <Suspense fallback={<SectionCardSkeleton />}>
            <FecherSSR />
          </Suspense>
        </div>

      </div>
    </section>
  );
}


function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:border-[#5B7FFF] transition">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}


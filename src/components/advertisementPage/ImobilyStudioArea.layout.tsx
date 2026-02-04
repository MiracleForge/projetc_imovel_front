import { Suspense } from "react";
import SectionCardSkeleton from "../layouts/cards/cardSections/HorizontalCardSection.skeleton";
import FecherSSR from "../wrappers/FecherSSR.wrapper";
import { StudioEntity } from "@/src/contracts/DTOs/ImobilyStudio/ImobilyStudio.entity.dto";
import { getImobilyStudioResumed } from "@/src/dal/ImobilyStudio.dal";

export default async function StudioSectionImproved() {
  const studio: StudioEntity | null = await getImobilyStudioResumed();
  console.log(studio)
  if (!studio) return null;
  return (
    <section className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden">

      {/* HEADER */}
      <div className="relative h-44">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
          className="w-full h-full object-cover"
          alt="Banner Studio"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-4 left-6 flex items-center gap-4">
          <img
            src="/miscellaneous/user-avatar.svg"
            className="w-20 h-20 rounded-lg border-4 border-white object-cover bg-white"
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
        <div className="flex flex-wrap gap-3">
          <button className="bg-[#5B7FFF] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#4A6FEE] transition">
            Seguir Studio
          </button>

          <button className="border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition">
            Entrar em contato
          </button>

          <button className="border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition">
            Ver Studio completo
          </button>
        </div>

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


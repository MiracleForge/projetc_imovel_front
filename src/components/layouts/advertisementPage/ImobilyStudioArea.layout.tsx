import FecherSSR from "../../wrappers/FecherSSR.wrapper";
import Image from "next/image";
import SectionCardSkeleton from "../cards/cardSections/HorizontalCardSection.skeleton";
import SectionMarketing from "../features/SectionMarketing.layout";
import { StudioEntity } from "@/src/contracts/DTOs/ImobilyStudio/ImobilyStudio.entity.dto";
import { Suspense } from "react";
import { getImobilyStudioResumed } from "@/src/dal/ImobilyStudio.dal";
import { StarIcon } from "../../ui/effects/ImobilyStudio.icon";
import CommumButton from "../../ui/buttons/CommumButton.ui";
import Link from "next/link";

export default async function StudioSectionImproved() {
  const studio: StudioEntity | null = await getImobilyStudioResumed();

  if (!studio) return null;
  return (
    <section className="w-full overflow-hidden rounded-t-xl">
      <SectionMarketing keys={["verified_sales", "verified_sales", "visibility"]} value={["3", "5", "3"]} simple />
      <div className="relative h-44 flex flex-col md:flex-row justify-around lg:justify-between items-start md:items-end p-3 rounded-t-xl">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
          className="w-full h-full object-cover rounded-t-xl"
          fill
          alt={`Banner Studio ${studio.name}`}
        />

        <div className=" flex items-center gap-4">
          <Image
            src="/miscellaneous/user-avatar.svg"
            alt={`Imagem do ${studio.name} responsável`}
            width={80}
            height={80}
            className="z-50 rounded-lg border-4 border-white object-cover bg-white"
          />

          <div className="text-white z-10">
            <h2 className="text-xl font-bold">{studio?.name}</h2>
            <p className="text-base opacity-80 font-normal">{studio.subtitle}</p>
          </div>
        </div>

        < ContactImobilyStudioArea />
      </div>

      <div className="space-y-6 pt-3">

        <p className="text-base font-medium text-gray-600 max-w-3xl">
          {studio.description}
        </p>

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
            <Link href="" className="text-sm text-[#5B7FFF] hover:underline">
              Ver todos
            </Link>
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
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center hover:border-[#5B7FFF] transition">
      <p className="text-base text-black font-semibold">{label}</p>
      <p className="text-lg font-bold text-secundary-blue  inline-flex flex-row space-x-2 "> <span>{value}</span> {label === "Avaliação" && <img src="/miscellaneous/star-icon.svg" />}</p>
    </div>
  );
}

function ContactImobilyStudioArea() {
  return (

    <div className=" z-20 flex gap-3 font-medium text-base">
      <button className="p-2 m-0 bg-secundary-blue hover:bg-secundary-blue/80 backdrop-blur rounded-full shadow">
        <img src={"/miscellaneous/message-button.svg"} alt="" />
      </button>
      <CommumButton variant={"highlight"} label="Seguir" className="flex gap-2 items-center">
        <StarIcon />
      </CommumButton>
      <button className="px-4 py-2 bg-white hover:bg-white/60  text-secundary-blue backdrop-blur rounded-lg shadow">
        Entre em Contato
      </button>
    </div>
  )
}

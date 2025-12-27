import Image from "next/image";
import LikeButton from "../buttons/LikeButtons.ui";
import Link from "next/link";
import UserAvatar from "../avatars/UserAvatar.ui";
import { advertisementCardOptions, homeCardAdvertisement } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";
import { formattedPrice } from "@/src/utils/formating.utils";
import { metricsIconsMap } from "@/src/data/global.constants";

interface PublicationCardProps {
  data: homeCardAdvertisement;
}

export default function PublicationCard({ data }: PublicationCardProps) {

  const formatedPrice = formattedPrice(data.price);

  return (
    <article
      itemScope
      itemType="https://schema.org/RealEstateListing"
      className="w-full max-w-[260px] lg:max-w-[280px] shrink-0"
    >
      <meta itemProp="datePosted" content={new Date(data.createdAt).toISOString()} />
      <Link
        href={data.slugUrl}
        itemProp="url"
        title={`Ver detalhes: ${data.title}`}
        className="flex flex-col gap-2 lg:gap-3 group"
      >
        {/* Imagem do Imóvel */}
        <figure className="relative aspect-14/10 overflow-hidden rounded-2xl shadow-[4px_5px_5px_0px] shadow-shadow-blue/85 transition-transform group-hover:scale-[1.02]">
          <Image
            src={data.images}
            alt={`Imóvel: ${data.title} - ${data.address.neighbourhood}, ${data.address.city}`}
            width={280}
            height={200}
            className="w-full h-full object-cover"
            itemProp="image"
            loading="lazy"
            sizes="(max-width: 768px) 260px, 280px"
          />
          {data.options && <OptionsGrid options={data.options} />}
          { /* TODO: likebutton realInitial value */}
          <LikeButton initialState={true} />
        </figure>

        {/* Informações do Imóvel */}
        <div className="flex flex-col gap-2 px-1">
          <h2
            className="text-sm font-bold text-neutral line-clamp-2 min-h-6 truncate"
            itemProp="name"
          >
            {data.title}
          </h2>

          {/* Preço */}
          <div
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
            className="inline-flex items-baseline gap-1 text-base font-medium text-neutral-secondary"
          >
            <span itemProp="priceCurrency" content="BRL">
              R$
            </span>
            <span itemProp="price" content={data.price.toString()}>
              {formatedPrice}
            </span>
            <meta itemProp="availability" content="https://schema.org/InStock" />
          </div>

          {/* Localização do Imóvel */}
          <p
            className="text-xs text-neutral-terciary line-clamp-1"
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <span itemProp="addressLocality">{data.address.neighbourhood}</span>
            <span>, </span>
            <span itemProp="addressRegion">{data.address.city}</span>
          </p>
        </div>

        {/* Footer com Anunciante */}
        <footer className="flex items-center gap-2 px-1 text-xs md:text-sm border-t border-neutral-terciary/10 pt-4">
          <UserAvatar size={32} image={data.advertiser.image} />

          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <p
              className="font-medium text-neutral line-clamp-1"
              itemProp="provider"
              itemScope
              itemType="https://schema.org/Person"
            >
              <span itemProp="name">{data.advertiser.name.split(" ", 2).join(" ")}</span>
            </p>
            <span className="flex justify-between items-center">
              <p className="text-[10px] text-neutral-terciary">
                {data.advertiser_type === "free" ? 'Anunciante' : 'Corretor'}
              </p>
              <p className="text-[10px] text-neutral-terciary">
                {new Date(data.createdAt).toLocaleString("pt-BR")} </p>
            </span>
          </div>
        </footer>
      </Link>
    </article>
  );
}


export function OptionsGrid({ options }: { options: advertisementCardOptions }) {

  return (
    <dl className="absolute grid grid-cols-2 gap-2 z-10 top-1 left-1">
      {Object.entries(options.propertyMetrics || {}).map(([key, value]) => (
        <div key={key}>
          <dt className="sr-only">{key}</dt>
          <dd className="p-1 bg-white/60 rounded-full shrink-0" title={`${key.toUpperCase()}: ${value}`}>
            <Image src={metricsIconsMap[key] ?? "/icons/listings/default.svg"} className="size-4" alt="" width={16} height={16} />
          </dd>
        </div>
      ))}
    </dl>
  );
}


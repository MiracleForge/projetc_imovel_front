import Image from "next/image";
import LikeButton from "../buttons/LikeButtons.ui";
import Link from "next/link";
import UserAvatar from "../avatars/UserAvatar.ui";
import { HomeCardsType } from "@/src/contracts/types/cards/responses.type";
import { formattedPrice } from "@/src/utils/formating.utils";

export default function PublicationCard({
  advertiser,
  title,
  slugUrl,
  brand,
  address,
  cardImage,
  price,
  createdAt
}: HomeCardsType) {

  const formatedPrice = formattedPrice(price);

  return (
    <article
      itemScope
      itemType="https://schema.org/RealEstateListing"
      className="w-full max-w-[260px] lg:max-w-[280px] shrink-0"
    >
      <meta itemProp="datePosted" content={new Date(createdAt).toISOString()} />
      <Link
        href={slugUrl}
        itemProp="url"
        title={`Ver detalhes: ${title}`}
        className="flex flex-col gap-2 lg:gap-3 group"
      >
        {/* Imagem do Imóvel */}
        <figure className="relative aspect-14/10 overflow-hidden rounded-2xl shadow-[4px_5px_5px_0px] shadow-shadow-blue/85 transition-transform group-hover:scale-[1.02]">
          <Image
            src={cardImage}
            alt={`Imóvel: ${title} - ${address.locality}, ${address.city}`}
            width={280}
            height={200}
            className="w-full h-full object-cover"
            itemProp="image"
            loading="lazy"
            sizes="(max-width: 768px) 260px, 280px"
          />

          <figcaption className="absolute top-2 left-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-100 text-red-600 text-[10px] font-medium shadow-sm">
            <Image
              src={brand.icon}
              alt=""
              width={12}
              height={12}
              className="w-3 h-3"
              aria-hidden="true"
            />
            <span className="capitalize">{brand.label}</span>
          </figcaption>
          <LikeButton initialState={true} />
          { /* TODO: likebutton realInitial value */}
        </figure>

        {/* Informações do Imóvel */}
        <div className="flex flex-col gap-2 px-1">
          <h2
            className="text-sm font-bold text-neutral line-clamp-2 min-h-6 truncate"
            itemProp="name"
          >
            {title}
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
            <span itemProp="price" content={price.toString()}>
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
            <span itemProp="addressLocality">{address.locality}</span>
            <span>, </span>
            <span itemProp="addressRegion">{address.city}</span>
          </p>
        </div>

        {/* Footer com Anunciante */}
        <footer className="flex items-center gap-2 px-1 text-xs md:text-sm border-t border-neutral-terciary/10 pt-4">
          <UserAvatar size={32} image={advertiser.image} />

          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <p
              className="font-medium text-neutral line-clamp-1"
              itemProp="provider"
              itemScope
              itemType="https://schema.org/Person"
            >
              <span itemProp="name">{advertiser.name.split(" ", 2).join(" ")}</span>
            </p>
            <span className="flex justify-between items-center">
              <p className="text-[10px] text-neutral-terciary">
                {advertiser.role === "owner" ? 'Anunciante' : 'Corretor'}
              </p>
              <p className="text-[10px] text-neutral-terciary">
                {new Date(createdAt).toLocaleString("pt-BR")} </p>
            </span>
          </div>
        </footer>
      </Link>
    </article>
  );
}

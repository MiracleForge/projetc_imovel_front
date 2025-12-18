import Link from "next/link";
import Image from "next/image";
import UserAvatar from "../avatars/UserAvatar.ui";
import LikeButton from "../buttons/LikeButtons.ui";
import { HomeCardsType } from "@/src/contracts/types/cards/responses.type";

export default function HomeCard({
  advertiser,
  title,
  slugUrl,
  brand,
  address,
  cardImage,
  price,
  createdAt
}: HomeCardsType) {
  const formattedPrice = price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <article
      itemScope
      itemType="https://schema.org/RealEstateListing"
      className="w-full max-w-[260px] shrink-0 lg:max-w-[280px]"
    >
      <Link
        href={slugUrl}
        itemProp="url"
        title={`Ver detalhes: ${title}`}
        className="flex flex-col gap-2 lg:gap-3 group"
      >
        {/* Imagem do Imóvel */}
        <figure className="relative overflow-hidden rounded-2xl shadow-[4px_5px_5px_0px] shadow-shadow-blue/85 transition-transform group-hover:scale-[1.02]">
          <Image
            src={cardImage}
            alt={`Imóvel: ${title} - ${address.locality}, ${address.city}`}
            width={280}
            height={200}
            className="w-full h-[180px] lg:h-[200px] object-cover"
            itemProp="image"
            loading="lazy"
            sizes="(max-width: 768px) 260px, 280px"
          />

          {/* Badge da Marca/Tipo */}
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
          <LikeButton initialState={price} />
        </figure>

        {/* Informações do Imóvel */}
        <div className="flex flex-col gap-2 px-1">
          <h2
            className="text-sm font-bold text-neutral line-clamp-2 min-h-10"
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
              {formattedPrice}
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
        <footer className="flex items-center gap-2 px-1 text-xs md:text-sm border-t border-neutral-terciary/10 pt-2">
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
                {new Date(createdAt).toLocaleDateString("pt-br")}
              </p>
            </span>
          </div>
        </footer>
      </Link>
    </article>
  );
}

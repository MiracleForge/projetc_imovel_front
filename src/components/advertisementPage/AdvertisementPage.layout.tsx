import { Suspense } from "react";
import AdvertisementSkeleton from "./AdvertiseSkeleton.skeleton";
import { AdvertisePageProps } from "@/src/app/(pages)/(dynamic)/anuncios/[category]/[propertySlug]/page";
import { advertisementPage } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";
import { getAdvertisementBySlug } from "@/src/dal/adversetiment.dal";
import { notFound } from "next/navigation";
import { generateAdvertisementJsonLd } from "@/src/seo/adversetimentJsonLd.seo";
import serializeJavascript from "serialize-javascript";
import { formattedPrice } from "@/src/utils/formating.utils";
import { GalleryAdvertizerPage } from "./GalleyAdvertiserPage.layout";
import CommumButton from "../ui/buttons/CommumButton.ui";
import { StarIcon } from "../ui/effects/ImobilyStudio.icon";
import LikeButton from "../ui/buttons/LikeButtons.ui";
import LazyLoadWrapper from "@/src/components/wrappers/LazyLoadWrapper.wrapper";
import { MetricDisplay } from "../layouts/Previews/MetricDisplay.layout";
import { amenitiesConfig, condominiumConfig, propertyMetricsConfig } from "@/src/content/adversetiment.content";

import dynamic from "next/dynamic";
import GoogleMapsComponent from "../layouts/Previews/googleMaps/GoogleMapsComponent.layout";
const FecherClient = dynamic(
  () => import("@/src/components/wrappers/FecherClient.wrapper"),
);
export default async function AdvertisementPage({ params }: AdvertisePageProps) {
  const ad: advertisementPage | null = await getAdvertisementBySlug({
    category: params.categoria,
    slug: params.slug
  });

  if (!ad) notFound();
  console.log(ad)
  const advertisementJsonLd = generateAdvertisementJsonLd(ad);
  const formatedPrice = formattedPrice(ad.price);

  return (
    <>
      <article
        itemScope
        itemType="https://schema.org/RealEstateListing"
        className="text-black"
      >
        <Suspense fallback={<AdvertisementSkeleton />}>
          <SeoJsonLd jsonLd={advertisementJsonLd} />

          <OfferHeader />

          <MainContent ad={ad} formatedPrice={formatedPrice} />

          <PropertyMetricsSection ad={ad} />
          <GoogleMapsComponent adress={ad.address} zoom={18} />

          <PropertyAmenitiesSection amenities={ad.options.amenities} />
          <PropertyCondominionSection condominion={ad.options.condominion} />
        </Suspense>
      </article>

      <LazyLoadWrapper>
        <FecherClient query="http://localhost:3000/api/casas" />
      </LazyLoadWrapper>
    </>
  );
}


function SeoJsonLd({ jsonLd }: { jsonLd: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJavascript(jsonLd, { isJSON: true })
      }}
    />
  );
}


function OfferHeader() {
  return (
    <header>
      <div
        itemProp="offers"
        itemScope
        itemType="https://schema.org/Offer"
        className="text-lg font-semibold text-secundary-blue"
      >
        <meta itemProp="priceCurrency" content="BRL" />
        <meta itemProp="availability" content="https://schema.org/InStock" />
      </div>
    </header>
  );
}


function MainContent({
  ad,
  formatedPrice
}: {
  ad: advertisementPage;
  formatedPrice: string;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 xl:gap-24 w-full items-stretch">
      <GalleryAdvertizerPage images={ad.images} title={ad.title} />
      <AsideInfo ad={ad} formatedPrice={formatedPrice} />
    </section>
  );
}


function AsideInfo({
  ad,
  formatedPrice
}: {
  ad: advertisementPage;
  formatedPrice: string;
}) {
  return (
    <aside className="flex flex-col h-full gap-3">

      <header className="flex flex-col gap-2">

        {ad.promotion === "studio" && (
          <CommumButton
            label={`${ad.advertiser.name}`}
            className="items-center flex w-fit space-x-2"
            url={`/stdio/${ad.advertiser.name}`}
            variant="highlight"
          >
            <StarIcon />
          </CommumButton>
        )}

        <h1 itemProp="name" className="text-xl font-bold text-neutral">
          {ad.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-neutral-terciary">
          <div aria-hidden="true" className="flex gap-1">
            <img src="/miscellaneous/star-icon.svg" className="h-4 w-4" alt="" />
            <img src="/miscellaneous/star-icon.svg" className="h-4 w-4" alt="" />
            <img src="/miscellaneous/star-icon.svg" className="h-4 w-4" alt="" />
            <img src="/miscellaneous/star-icon.svg" className="h-4 w-4" alt="" />
            <img src="/miscellaneous/star-empty-icon.svg" className="h-4 w-4" alt="" />
          </div>

          <span className="text-secundary-blue font-normal mx-2">|</span>
          <span className="text-secundary-blue font-normal capitalize">
            {ad.transactionMode}
          </span>

        </div>

        <section
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
          className="text-2xl font-medium text-black"
        >
          <meta itemProp="priceCurrency" content="BRL" />
          <span className="text-lg" itemProp="price" content={ad.price.toString()}>
            R$ {formatedPrice}
          </span>
          <meta itemProp="availability" content="https://schema.org/InStock" />
        </section>

      </header>

      <hr className="border-gray-200" />

      <section aria-labelledby="descricao-imovel">
        <h2 id="descricao-imovel" className="sr-only">
          Descrição do imóvel
        </h2>
        <p className="text-justify text-base">
          {ad.description}
        </p>
      </section>

      <section className="mt-auto flex flex-col gap-3">
        <div className="h-10 flex items-stretch gap-2.5">

          <button className="flex-1 bg-secundary-blue text-white px-4 text-base font-semibold rounded-md flex items-center justify-center">
            Entre em Contato
          </button>

          <div className="relative w-14 border rounded-md cursor-pointer flex items-center justify-center">
            <LikeButton initialState={false} />
          </div>

        </div>
      </section>

      <address className="not-italic">
        <nav aria-label="Ações de contato do anunciante">
          <div className="flex flex-wrap gap-2">

            <a
              href={`tel:${ad.phone}`}
              className="flex-1 min-w-fit inline-flex items-center justify-center gap-2 p-1 border rounded-sm border-gray-200"
            >
              <img src="/miscellaneous/phone-icon.svg" alt="" aria-hidden="true" />
              <span>(71) 98447-4664</span>
            </a>

            <button
              type="button"
              className="flex-1 min-w-fit inline-flex items-center justify-center gap-2 p-1 border rounded-sm border-gray-200"
            >
              <img src="/miscellaneous/phone-icon.svg" alt="" aria-hidden="true" />
              <span>Chat</span>
            </button>

            <button
              type="button"
              className="flex-1 min-w-fit inline-flex items-center justify-center gap-2 p-1 border rounded-sm border-gray-200"
            >
              <img src="/miscellaneous/phone-icon.svg" alt="" aria-hidden="true" />
              <span>Agendar visita</span>
            </button>

          </div>
        </nav>
      </address>

      <hr className="border-gray-200" />
      <footer className="flex items-center gap-3 text-base text-neutral-terciary">
        <img
          className="size-10 rounded-full"
          src={ad.advertiser.image || "/mi"}
          alt={`Foto de ${ad.advertiser.name}`}
        />
        <p>
          Anunciado por{" "}
          <span itemProp="provider" itemScope itemType="https://schema.org/Person">
            <span itemProp="name" className="text-black">
              {ad.advertiser.name}
            </span>
          </span>
        </p>
      </footer>

    </aside>
  );
}


function AddressSection({ ad }: { ad: advertisementPage }) {
  return (
    <section
      itemProp="address"
      itemScope
      itemType="https://schema.org/PostalAddress"
      className="flex flex-wrap items-center gap-4 text-sm text-neutral-terciary"
    >
      <span className="flex items-center gap-1.5 min-w-fit">
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="capitalize truncate">{ad.address.state}</span>
      </span>

      <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
      <span className="capitalize truncate">{ad.address.city}</span>

      <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
      <span className="capitalize truncate">{ad.address.neighbourhood}</span>

      <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
      <span className="capitalize truncate">{ad.address.street}</span>

    </section>
  );
}


function PropertyMetricsSection({ ad }: { ad: advertisementPage }) {
  return (
    <section className="mb-6 pt-6 space-y-6">
      <div className="wrapper-cards-header tipografy-title">
        <h2 className="wrapper-cards-title">Especificações do imóvel</h2>
      </div>

      <dl className="flex flex-wrap gap-2">
        {propertyMetricsConfig.map(({ field, label, icon, formatter }) => {
          const rawValue = ad.options.propertyMetrics[field];
          if (!rawValue) return null;

          const formattedValue = formatter
            ? formatter(rawValue)
            : rawValue;

          return (
            <div key={field} className="flex-1 min-w-fit">
              <MetricDisplay
                value={formattedValue}
                label={label}
                iconKey={field}
                iconsMap={{ [field]: icon }}
              />
            </div>
          );
        })}
      </dl>
    </section>
  );
}


function PropertyAmenitiesSection({
  amenities
}: {
  amenities: advertisementPage["options"]["amenities"];
}) {
  if (!amenities) return null;

  return (
    <section className="mb-6 pt-6 space-y-6">
      <div className="wrapper-cards-header tipografy-title">
        <h2 className="wrapper-cards-title">Características do Imóvel</h2>
      </div>

      <dl className="flex flex-wrap gap-2">
        {amenitiesConfig.map(({ field, label, icon }) => {
          const value = amenities[field];
          if (!value) return null;

          return (
            <div key={field} className="flex-1 min-w-fit">
              <MetricDisplay
                value={value}
                label={label}
                iconKey={field}
                iconsMap={{ [field]: icon }}
              />
            </div>
          );
        })}
      </dl>
    </section>
  );
}



function PropertyCondominionSection({
  condominion
}: {
  condominion: advertisementPage["options"]["condominion"];
}) {
  if (!condominion) return null;

  return (
    <section className="mb-6 pt-6 space-y-6">
      <div className="wrapper-cards-header tipografy-title">
        <h2 className="wrapper-cards-title">Características do Condomínio</h2>
      </div>

      <dl className="flex flex-wrap gap-2">
        {condominiumConfig.map(({ field, label, icon }) => {
          const value = condominion[field];
          if (!value) return null;

          return (
            <div key={field} className="flex-1 min-w-fit">
              <MetricDisplay
                value={value}
                label={label}
                iconKey={field}
                iconsMap={{ [field]: icon }}
              />
            </div>
          );
        })}
      </dl>
    </section>
  );
}


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
import { propertyMetricsConfig } from "@/src/content/adversetiment.content";

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

        <h1 itemProp="name" className="text-2xl font-bold text-neutral">
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

          <span>{ad.transactionMode}</span>
        </div>

        <section
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
          className="text-2xl font-medium text-black"
        >
          <meta itemProp="priceCurrency" content="BRL" />
          <span itemProp="price" content={ad.price.toString()}>
            R$ {formatedPrice}
          </span>
          <meta itemProp="availability" content="https://schema.org/InStock" />
        </section>

        <AddressSection ad={ad} />
      </header>

      <hr className="border-gray-200" />

      <section aria-labelledby="descricao-imovel">
        <h2 id="descricao-imovel" className="sr-only">
          Descrição do imóvel
        </h2>
        <p className="max-w-[80%] text-justify text-xl">
          {ad.description}
        </p>
      </section>

      <section className="mt-auto pt-6 flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <button className="w-full bg-secundary-blue text-white px-6 py-3 text-xl font-semibold">
            Entre em Contato
          </button>

          <div className="relative w-16 h-12 border rounded-md flex items-center justify-center cursor-pointer">
            <LikeButton initialState={false} />
          </div>
        </div>
      </section>

      <address className="not-italic">
        <nav aria-label="Ações de contato do anunciante">
          <ul className="flex justify-between w-full">

            <li>
              <a
                href={`tel:${ad.phone}`}
                className="flex items-center gap-2 border px-4 py-2 rounded-sm border-gray-200"
              >
                <img src="/miscellaneous/phone-icon.svg" alt="" aria-hidden="true" />
                <span>Ligar</span>
              </a>
            </li>

            <li>
              <a
                href={`https://wa.me/55${ad.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border px-4 py-2 rounded-sm border-gray-200"
              >
                <img src="/miscellaneous/phone-icon.svg" alt="" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </li>

            <li>
              <button type="button" className="flex items-center gap-2 border px-4 py-2 rounded-sm border-gray-200">
                <img src="/miscellaneous/phone-icon.svg" alt="" aria-hidden="true" />
                <span>Agendar visita</span>
              </button>
            </li>

          </ul>
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
      className="flex flex-wrap items-center gap-4 text-lg text-neutral-terciary"
    >
      <span className="flex items-center gap-1.5 min-w-0">
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
        <h2 className="wrapper-cards-title">Características do Imóvel</h2>
      </div>

      <dl className="formGridContainer md:flex md:flex-row">
        {propertyMetricsConfig.map(({ field, label, icon }) => {
          const value = ad.options.propertyMetrics[field];
          if (!value) return null;

          return (
            <MetricDisplay
              key={field}
              value={value}
              label={label}
              iconKey={field}
              iconsMap={{ [field]: icon }}
            />
          );
        })}
      </dl>
    </section>
  );
}

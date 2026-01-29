import { Suspense } from "react";
import AdvertisementSkeleton from "./AdvertiseSkeleton.skeleton";
import { AdvertisePageProps } from "@/src/app/(pages)/(dynamic)/anuncios/[category]/[propertySlug]/page";
import { advertisementPage } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";
import { getAdvertisementBySlug } from "@/src/dal/adversetiment.dal";
import { notFound } from "next/navigation";
import { generateAdvertisementJsonLd } from "@/src/seo/adversetimentJsonLd.seo";
import LargeDisplay from "../layouts/Previews/LargeImageDisplay.preview";
import serializeJavascript from "serialize-javascript";
import SmallDisplay from "../layouts/banners/SmallDisplay.layout";
import { formattedPrice } from "@/src/utils/formating.utils";
import { OptionsGrid } from "../ui/cards/PublicationCard.list";

export default async function AdvertisementPage({ params, searchParams }: AdvertisePageProps) {

  const ad: advertisementPage | null = await getAdvertisementBySlug({
    category: params.categoria,
    slug: params.slug
  });
  if (!ad) notFound();

  const advertisementJsonLd = generateAdvertisementJsonLd(ad);
  const formatedPrice = formattedPrice(ad.price);
  return (
    <main
      itemScope

      itemType="https://schema.org/RealEstateListing"
      className="text-black"
    >
      <Suspense fallback={<AdvertisementSkeleton />}>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJavascript(advertisementJsonLd, { isJSON: true })
          }}
        />

        <article>

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

          <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 xl:gap-24 w-full">

            <figure className="flex flex-col md:flex-row gap-4 items-stretch w-full">

              <nav aria-label="Galeria de imagens do imóvel" className="order-2 md:order-1">
                <ul className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  {ad.images.slice(1, 6).map((img, index) => (
                    <li
                      key={img}
                      className={index === 4 ? "hidden xl:block" : ""}
                    >
                      <button type="button" aria-label="Selecionar imagem">
                        <SmallDisplay src={img} alt={ad.title} />
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex-1 order-1 md:order-2">
                <LargeDisplay src={ad.images[0]} alt={ad.title} />
              </div>
            </figure>

            <aside className="flex flex-col gap-3">
              <h1 itemProp="name" className="text-2xl font-bold text-neutral mb-2">
                {ad.title}
              </h1>

              <span className="text-black font-medium text-2xl" itemProp="price" content={ad.price.toString()}>
                R$ {formatedPrice}
              </span>


              <div className="border-b-2 border-gray-200 gap-3" />
              <p className="max-w-[80%] text-justify text-lg">{ad.description}</p>
              <p className="font-normal text-lg">Área total: {ad.options.propertyMetrics.area} m²</p>

              <span className="py-3">
                <OptionsGrid options={ad.options} flat />
              </span>

            </aside>

          </section>

          <section
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
            className="text-sm text-neutral-terciary mb-6"
          >
            <h2 className="sr-only">Localização</h2>
            <span itemProp="addressLocality">{ad.address.neighbourhood}</span>,{" "}
            <span itemProp="addressRegion">
              {ad.address.city} - {ad.address.state}
            </span>
          </section>

          {ad.options?.propertyMetrics && (
            <section className="mb-6">
              <h2 className="text-sm font-semibold mb-2">Características do imóvel</h2>

              <dl className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries(ad.options.propertyMetrics).map(
                  ([key, value]) =>
                    value ? (
                      <div key={key} className="flex gap-1">
                        <dt className="font-medium capitalize">{key}</dt>
                        <dd>{value}</dd>
                      </div>
                    ) : null
                )}
              </dl>
            </section>
          )}

          <footer
            itemProp="provider"
            itemScope
            itemType="https://schema.org/Person"
            className="border-t pt-4 mt-6 text-sm"
          >
            <p>
              Anunciado por <span itemProp="name">{ad.advertiser.name}</span>
            </p>
          </footer>

        </article>
      </Suspense>
    </main>

  )
}

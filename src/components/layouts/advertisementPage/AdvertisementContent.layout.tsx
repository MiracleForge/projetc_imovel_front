import { advertisementPage } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";
import { generateAdvertisementJsonLd } from "@/src/seo/adversetimentJsonLd.seo";
import { notFound } from "next/navigation";
import { getAdvertisementBySlug } from "@/src/dal/adversetiment.dal";
import LargeDisplay from "../Previews/LargeImageDisplay.preview";

export default async function AdvertisementContent({
}: {
  }) {
  const ad: advertisementPage | null = await getAdvertisementBySlug();

  if (!ad) notFound();

  const advertisementJsonLd = generateAdvertisementJsonLd(ad);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(advertisementJsonLd) }}
      />

      <h1 itemProp="name" className="text-xl font-bold text-neutral mb-2">
        {ad.title}
      </h1>

      <div
        itemProp="offers"
        itemScope
        itemType="https://schema.org/Offer"
        className="text-lg font-semibold text-secundary-blue mb-4"
      >
        <meta itemProp="priceCurrency" content="BRL" />
        <span itemProp="price">{ad.price}</span>
        <meta itemProp="availability" content="https://schema.org/InStock" />
      </div>

      <LargeDisplay src={ad.images[0]} alt={ad.title} fallback="" />

      <section
        itemProp="address"
        itemScope
        itemType="https://schema.org/PostalAddress"
        className="text-sm text-neutral-terciary mb-6"
      >
        <span itemProp="addressLocality">{ad.address.neighbourhood}</span>
        ,{" "}
        <span itemProp="addressRegion">{ad.address.city} - {ad.address.state}</span>
      </section>

      {ad.options?.propertyMetrics && (
        <section className="grid grid-cols-2 gap-3 mb-6 text-sm">
          {Object.entries(ad.options.propertyMetrics).map(
            ([key, value]) =>
              value ? (
                <div key={key} className="flex gap-1">
                  <strong className="capitalize">{key}:</strong>
                  <span>{value}</span>
                </div>
              ) : null,
          )}
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
    </>
  );
}



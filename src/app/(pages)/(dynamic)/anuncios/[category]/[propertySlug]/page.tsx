import { Metadata } from "next";
import { notFound } from "next/navigation";
import { homeCardAdvertisement } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";
import LargeDisplay from "@/src/components/layouts/Previews/LargeImageDisplay.preview";
import { Suspense } from "react";

type PageProps = {
  params: {
    categoria: string;
    slug: string;
  };
  searchParams?: {
    rec?: string;
    lis?: string;
  };
};

export default async function AdvertisementPage({
  params,
  searchParams,
}: PageProps) {
  const { categoria, slug } = params;

  const advertisement: homeCardAdvertisement | null =
    await getAdvertisementBySlug({ category: categoria, slug });

  if (!advertisement) {
    notFound();
  }

  /* JSON-LD para SEO */
  const advertisementJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: advertisement.title,
    description: advertisement.title,
    image: advertisement.image,
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "BRL",
      highPrice: advertisement.price,
      lowPrice: advertisement.price,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: advertisement.address.neighbourhood,
      addressRegion: advertisement.address.city,
      addressCountry: "BR",
    },
    seller: {
      "@type": "Person",
      name: advertisement.advertiser.name,
    },
  };

  const recommendationSource = searchParams?.rec;
  const listingSource = searchParams?.lis;

  return (
    <main
      itemScope
      itemType="https://schema.org/RealEstateListing"
      className="container mx-auto px-4 py-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(advertisementJsonLd) }}
      />

      <h1 itemProp="name" className="text-xl font-bold text-neutral mb-2">
        {advertisement.title}
      </h1>

      <div
        itemProp="offers"
        itemScope
        itemType="https://schema.org/Offer"
        className="text-lg font-semibold text-secundary-blue mb-4"
      >
        <meta itemProp="priceCurrency" content="BRL" />
        <span itemProp="price">{advertisement.price}</span>
        <meta itemProp="availability" content="https://schema.org/InStock" />
      </div>

      {/* IMAGEM PRINCIPAL */}
      <Suspense
        fallback={
          <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
        }
      >
        <LargeDisplay src={advertisement.image} alt={advertisement.title} />
      </Suspense>

      {/* ENDEREÇO */}
      <section
        itemProp="address"
        itemScope
        itemType="https://schema.org/PostalAddress"
        className="text-sm text-neutral-terciary mb-6"
      >
        <span itemProp="addressLocality">{advertisement.address.neighbourhood}</span>
        ,{" "}
        <span itemProp="addressRegion">{advertisement.address.city} - {advertisement.address.state}</span>
      </section>

      {advertisement.options?.propertyMetrics && (
        <section className="grid grid-cols-2 gap-3 mb-6 text-sm">
          {Object.entries(advertisement.options.propertyMetrics).map(
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
          Anunciado por <span itemProp="name">{advertisement.advertiser.name}</span>
        </p>
      </footer>

      {/* DEBUG opcional de origem */}
      {(recommendationSource || listingSource) && (
        <aside className="mt-8 text-xs text-neutral-terciary">
          Origem: {recommendationSource} / {listingSource}
        </aside>
      )}
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { categoria: string; slug: string };
}): Promise<Metadata> {
  const ad: homeCardAdvertisement | null = await getAdvertisementBySlug({
    category: params.categoria,
    slug: params.slug,
  });

  if (!ad) return {};

  const title = `${ad.title} em ${ad.address.city} | SeuSite`;
  const description = `${ad.title} localizado em ${ad.address.neighbourhood}, ${ad.address.city}.`;
  const imageUrl = ad.image || "/images/placeholders/real-estate.webp";

  return {
    metadataBase: new URL("https://www.seusite.com"),
    title,
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": 500,
      },
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ad.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: "@SeuSite",
      creator: "@SeuSite",
    },
    authors: [
      {
        name: ad.advertiser.name,
      },
    ],
  };
}

const getAdvertisementBySlug = async ({
  category,
  slug,
}: {
  category: string;
  slug: string;
}): Promise<homeCardAdvertisement | null> => {
  try {
    const response = await fetch("https://free.mockerapi.com/mock/baf90fc1-1f47-41f0-922e-9457bc6cb3ae");

    if (!response.ok) throw new Error("Fetch failed");

    const data: homeCardAdvertisement[] = await response.json();

    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching advertisement:", error);
    return null;
  }
};


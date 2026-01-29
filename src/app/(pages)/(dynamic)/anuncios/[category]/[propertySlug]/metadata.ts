import { Metadata } from "next";
import { advertisementPage } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";

export function buildAdvertisementMetadata(ad: advertisementPage): Metadata {
  const title = `${ad.title} em ${ad.address.city} | Imobily`;
  const description = `${ad.title} localizado em ${ad.address.neighbourhood}, ${ad.address.city}.`;
  const images = Array.isArray(ad.images) && ad.images.length > 0
    ? ad.images
    : ["/images/placeholders/real-estate.webp"];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      publishedTime: new Date(ad.createdAt).toISOString(),
      images: images.map((url) => ({
        url,
        width: 1200,
        height: 630,
        alt: ad.title,
      })),
    },
    authors: [
      {
        name: ad.advertiser.name,
      },
    ],
  };
}

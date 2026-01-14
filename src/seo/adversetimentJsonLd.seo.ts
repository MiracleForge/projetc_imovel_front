import { advertisementPage } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";

export const generateAdvertisementJsonLd = (ad: advertisementPage) => {
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: ad.title,
    description: ad.description || ad.title,
    url: `https://seusite.com.br/anuncios/${ad.category}/${ad.slugUrl}`,

    image: ad.images || "/images/placeholders/real-estate.webp",

    offers: {
      "@type": "Offer",
      price: ad.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      validFrom: new Date(ad.createdAt),
    },

    // address: {
    //   "@type": "PostalAddress",
    //   addressLocality: ad.address.city || "city",
    //   addressRegion: ad.address.state || "BA",
    //   addressCountry: "BR",
    //   streetAddress: ad.address.neighbourhood,
    // },
    //
    // // Anunciante
    // provider: {
    //   // TODO: ADD ADVERTIZER TYPE
    //   // "@type": ad.advertiser.type === "company" ? "Organization" : "Person",
    //   name: ad.advertiser.name,
    // },
    //
    // Datas
    datePosted: new Date(ad.createdAt),
  };
  //
  // if (ad.options.propertyMetrics.rooms) {
  //   jsonLd.numberOfRooms = ad.options.propertyMetrics.rooms;
  // }
  //
  // if (ad.options.propertyMetrics.bathrooms) {
  //   jsonLd.numberOfBathroomsTotal = ad.options.propertyMetrics.bathrooms;
  // }
  //
  // if (ad.options.propertyMetrics.area) {
  //   jsonLd.floorSize = {
  //     "@type": "QuantitativeValue",
  //     value: ad.options.propertyMetrics.area,
  //     unitCode: "MTK"
  //   };
  // }
  //
  return jsonLd;
};

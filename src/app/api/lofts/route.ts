import { HomeCardsType } from "@/src/contracts/types/cards/responses.type";
import { NextResponse } from "next/server";

const lofts: HomeCardsType[] = [
  {
    id: "string",
    category: "casas-e-sobrados",
    title: "Loft Compacto",
    slugUrl: "/lofts/1",

    brand: {
      label: "CityLofts",
      icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    },

    cardImage: "https://images.unsplash.com/photo-1572120360610-d971b9b639d1",
    price: 280000,

    address: {
      city: "Belo Horizonte",
      locality: "Savassi",
    },

    advertiser: {
      id: "adv-1",
      name: "Carlos Pereira",
      image: "https://i.pravatar.cc/150?img=3",
      role: "realtor",
    },

    createdAt: new Date
  },
  {
    id: "string",
    category: "casas-e-sobrados",
    title: "Loft Industrial",
    slugUrl: "/lofts/2",

    brand: {
      label: "CityLofts",
      icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    },

    cardImage: "https://images.unsplash.com/photo-1560448070-62f85d3745e5",
    price: 400000,

    address: {
      city: "Porto Alegre",
      locality: "Moinhos de Vento",
    },

    advertiser: {
      id: "adv-2",
      name: "Fernanda Ribeiro Alcantara",
      image: "https://i.pravatar.cc/150?img=8",
      role: "realtor",
    },

    createdAt: new Date()
  },
];

export async function GET() {
  return NextResponse.json(lofts);
}


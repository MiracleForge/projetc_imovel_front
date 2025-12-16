import { NextResponse } from "next/server";
import { HomeCardProps } from "@/src/contracts/types/cards/responses.type";

const coberturas: HomeCardProps[] = [
  {
    slugUrl: "/coberturas/1",
    category: "apartamentos",
    title: "Cobertura Luxuosa",

    brand: {
      label: "PrimeResidences",
      icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    },

    cardImage: "https://images.unsplash.com/photo-1599423300746-b62533397364",
    price: 1_250_000,

    address: {
      city: "São Paulo",
      locality: "Jardins",
    },

    advertiser: {
      id: "adv-3",
      name: "Ana Souza",
      image: "https://i.pravatar.cc/150?img=4",
      role: "owner",
    },

    createdAt: new Date()
  },
  {
    slugUrl: "/coberturas/2",
    category: "apartamentos",
    title: "Cobertura Moderna",

    brand: {
      label: "PrimeResidences",
      icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    },

    cardImage: "https://images.unsplash.com/photo-1572120360610-d971b9b639d1",
    price: 980_000,

    address: {
      city: "Rio de Janeiro",
      locality: "Ipanema",
    },

    advertiser: {
      id: "adv-4",
      name: "Thiago Santos",
      image: "https://i.pravatar.cc/150?img=9",
      role: "owner",
    },

    createdAt: new Date()
  },
];

export async function GET() {
  return NextResponse.json(coberturas);
}


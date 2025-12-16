import { NextResponse } from "next/server";
import { HomeCardProps } from "@/src/contracts/types/cards/responses.type";

const apartamentos: HomeCardProps[] = [
  {
    slugUrl: "/apartamentos/1",
    category: "apartamentos",
    title: "Apartamento Moderno",

    brand: {
      label: "UrbanHomes",
      icon: "https://images.unsplash.com/photo-1560448204-4e0b7fdbf4d2",
    },

    cardImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 350_000,

    address: {
      city: "São Paulo",
      locality: "Vila Madalena",
    },

    advertiser: {
      id: "adv-1",
      name: "João Silva",
      image: "https://i.pravatar.cc/150?img=1",
      role: "realtor",
    },

    createdAt: new Date()
  },
  {
    slugUrl: "/apartamentos/2",
    category: "apartamentos",
    title: "Apartamento Compacto",

    brand: {
      label: "UrbanHomes",
      icon: "https://images.unsplash.com/photo-1560448204-4e0b7fdbf4d2",
    },

    cardImage: "https://images.unsplash.com/photo-1560448070-62f85d3745e5",
    price: 300_000,

    address: {
      city: "São Paulo",
      locality: "Pinheiros",
    },

    advertiser: {
      id: "adv-7",
      name: "Lucas Martins",
      image: "https://i.pravatar.cc/150?img=7",
      role: "owner",
    },

    createdAt: new Date()
  },
];

export async function GET() {
  return NextResponse.json(apartamentos);
}


import { NextResponse } from "next/server";
import { HomeCardProps } from "@/src/contracts/types/cards/responses.type";

const casas: HomeCardProps[] = [
  {
    slugUrl: "/casas/1",
    category: "casas",
    title: "Casa com Jardim",

    brand: {
      label: "GreenLiving",
      icon: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },

    cardImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 750_000,

    address: {
      city: "Rio de Janeiro",
      locality: "Barra da Tijuca",
    },

    advertiser: {
      id: "adv-5",
      name: "Maria Oliveira",
      image: "https://i.pravatar.cc/150?img=2",
      role: "owner",
    },

    createdAt: new Date()
  },
  {
    slugUrl: "/casas/2",
    category: "casas",
    title: "Casa Rústica Atualizada",

    brand: {
      label: "RusticHomes",
      icon: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
    },

    cardImage: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
    price: 450_000,

    address: {
      city: "Curitiba",
      locality: "Batel",
    },

    advertiser: {
      id: "adv-6",
      name: "Paula Lima",
      image: "https://i.pravatar.cc/150?img=6",
      role: "owner",
    },

    createdAt: new Date()
  },
];

export async function GET() {
  return NextResponse.json(casas);
}


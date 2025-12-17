import { NextResponse } from "next/server";
import { HomeCardProps } from "@/src/contracts/types/cards/responses.type";

export const cards: HomeCardProps[] = [
  {
    slugUrl: "/apartamentos/1",
    category: "condomínios",
    title: "Apartamento Moderno atualizado",

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
    slugUrl: "/casas/2",
    category: "casas-e-sobrados",
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
      id: "adv-2",
      name: "Maria Oliveira",
      image: "https://i.pravatar.cc/150?img=2",
      role: "owner",
    },

    createdAt: new Date()
  },
  {
    slugUrl: "/lofts/3",
    category: "apartamentos",
    title: "Loft Compacto",

    brand: {
      label: "CityLofts",
      icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    },

    cardImage: "https://images.unsplash.com/photo-1572120360610-d971b9b639d1",
    price: 280_000,

    address: {
      city: "Belo Horizonte",
      locality: "Savassi",
    },

    advertiser: {
      id: "adv-3",
      name: "Carlos Pereira",
      image: "https://i.pravatar.cc/150?img=3",
      role: "realtor",
    },

    createdAt: new Date()
  },
  {
    slugUrl: "/coberturas/4",
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
      id: "adv-4",
      name: "Ana Souza",
      image: "https://i.pravatar.cc/150?img=4",
      role: "owner",
    },

    createdAt: new Date()
  },
  {
    slugUrl: "/apartamentos/5",
    category: "casas-e-sobrados",
    title: "Apartamento à Beira-Mar",

    brand: {
      label: "BeachLife",
      icon: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
    },

    cardImage: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
    price: 650_000,

    address: {
      city: "Florianópolis",
      locality: "Jurerê",
    },

    advertiser: {
      id: "adv-5",
      name: "Rafael Costa",
      image: "https://i.pravatar.cc/150?img=5",
      role: "owner",
    },

    createdAt: new Date()
  }
];

export async function GET() {
  console.log("done");
  await new Promise(resolve => setTimeout(resolve, 2000));
  return NextResponse.json(cards);
}


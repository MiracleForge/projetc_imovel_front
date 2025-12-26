"use server";

import { NextResponse } from "next/server";
import { homeCardAdvertisement } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";

export async function GET() {
  try {
    const cards: homeCardAdvertisement[] = [
      {
        id: "23",
        slugUrl: "/apartamentos/1",
        category: "condomínios",
        title: "Apartamento Moderno atualizado",
        images: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        price: 350000,
        advertiser_id: "122222",
        advertiser_type: "studio",
        advertiser: {
          name: "João Silva",
          image: "https://i.pravatar.cc/150?img=1",
        },
        address: {
          city: "São Paulo",
          neighbourhood: "Vila Madalena",
          state: "Bahia",
        },
        options: {
          propertyMetrics: {
            area: 435454,
            bathrooms: 4,
            garage: 2,
            rooms: 3,
          },
        },
        createdAt: new Date(),
      }, {
        id: "23",
        slugUrl: "/apartamentos/1",
        category: "condomínios",
        title: "Apartamento Moderno atualizado",
        images: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        price: 350000,
        advertiser_id: "122222",
        advertiser_type: "studio",
        advertiser: {
          name: "João Silva",
          image: "https://i.pravatar.cc/150?img=1",
        },
        address: {
          city: "São Paulo",
          neighbourhood: "Vila Madalena",
          state: "Bahia",
        },
        options: {
          propertyMetrics: {
            area: 435454,
            bathrooms: 4,
            garage: 2,
            rooms: 3,
          },
        },
        createdAt: new Date(),
      }, {
        id: "23",
        slugUrl: "/apartamentos/1",
        category: "condomínios",
        title: "Apartamento Moderno atualizado",
        images: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        price: 350000,
        advertiser_id: "122222",
        advertiser_type: "studio",
        advertiser: {
          name: "João Silva",
          image: "https://i.pravatar.cc/150?img=1",
        },
        address: {
          city: "São Paulo",
          neighbourhood: "Vila Madalena",
          state: "Bahia",
        },
        options: {
          propertyMetrics: {
            area: 435454,
            bathrooms: 4,
            garage: 2,
            rooms: 3,
          },
        },
        createdAt: new Date(),
      },
      {
        id: "1",
        slugUrl: "/casas/2",
        category: "casas-e-sobrados",
        title: "Casa com Jardim",
        images: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        price: 750_000,
        advertiser_id: "adv-2",
        advertiser_type: "paid",
        advertiser: {
          name: "Maria Oliveira",
          image: "https://i.pravatar.cc/150?img=2",
        },
        address: {
          city: "Rio de Janeiro",
          neighbourhood: "Barra da Tijuca",
          state: "RJ",
        },
        options: {
          propertyMetrics: {
            area: 400,
            bathrooms: 6,
            garage: 3,
            rooms: 6,
          },
        },
        createdAt: new Date(),
      },
      {
        id: "12",
        slugUrl: "/lofts/3",
        category: "apartamentos",
        title: "Loft Compacto",
        images: "https://images.unsplash.com/photo-1572120360610-d971b9b639d1",
        price: 280_000,
        advertiser_id: "adv-3",
        advertiser_type: "free",
        advertiser: {
          name: "Carlos Pereira",
          image: "https://i.pravatar.cc/150?img=3",
        },
        address: {
          city: "Belo Horizonte",
          neighbourhood: "Savassi",
          state: "MG",
        },
        options: {
          propertyMetrics: {},
        },
        createdAt: new Date(),
      },
      {
        id: "4",
        slugUrl: "/coberturas/4",
        category: "apartamentos",
        title: "Cobertura Luxuosa",
        images: "https://images.unsplash.com/photo-1599423300746-b62533397364",
        price: 1_250_000,
        advertiser_id: "adv-4",
        advertiser_type: "free",
        advertiser: {
          name: "Ana Souza",
          image: "https://i.pravatar.cc/150?img=4",
        },
        address: {
          city: "São Paulo",
          neighbourhood: "Jardins",
          state: "SP",
        },
        options: {
          propertyMetrics: {},
        },
        createdAt: new Date(),
      },
      {
        id: "6",
        slugUrl: "/apartamentos/5",
        category: "casas-e-sobrados",
        title: "Apartamento à Beira-Mar",
        images: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
        price: 650_000,
        advertiser_id: "adv-5",
        advertiser_type: "free",
        advertiser: {
          name: "Rafael Costa",
          image: "https://i.pravatar.cc/150?img=5",
        },
        address: {
          city: "Florianópolis",
          neighbourhood: "Jurerê",
          state: "SC",
        },
        options: {
          propertyMetrics: {},
        },
        createdAt: new Date(),
      },
    ];


    await new Promise(resolve => setTimeout(resolve, 2000));
    return NextResponse.json({
      message: "Subscriptions fetched successfully",
      error: null,
      data: cards,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Failed to fetch subscriptions",
      error: err instanceof Error ? err.message : "Unknown error",
      data: null,
    }, { status: 500 });
  }
}


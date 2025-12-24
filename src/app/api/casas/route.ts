"use server";

import { homeCardAdvertisement } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";
import { NextResponse } from "next/server";

export async function GET() {

  try {
    const casas: homeCardAdvertisement[] = [
      {
        id: "1",
        slugUrl: "/casas/1",
        category: "casas-e-sobrados",
        title: "Casa com Jardim",
        images: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        price: 750_000,
        advertiser_id: "adv-5",
        advertiser_type: "free",
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
            bathrooms: 3,
            garage: 2,
            rooms: 4,
          },
        },
        createdAt: new Date(),
      },
      {
        id: "2",
        slugUrl: "/casas/2",
        category: "casas-e-sobrados",
        title: "Casa Rústica Atualizada",
        images: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
        price: 450_000,
        advertiser_id: "adv-6",
        advertiser_type: "free",
        advertiser: {
          name: "Paula Lima",
          image: "https://i.pravatar.cc/150?img=6",
        },
        address: {
          city: "Curitiba",
          neighbourhood: "Batel",
          state: "PR",
        },
        options: {
          propertyMetrics: {
            area: 320,
            bathrooms: 2,
            garage: 1,
            rooms: 3,
          },
        },
        createdAt: new Date(),
      },
    ];

    return NextResponse.json({
      message: "Subscriptions fetched successfully",
      error: null,
      data: casas,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Failed to fetch subscriptions",
      error: err instanceof Error ? err.message : "Unknown error",
      data: null,
    }, { status: 500 });
  }
}


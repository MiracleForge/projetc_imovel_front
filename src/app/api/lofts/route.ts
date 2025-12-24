"use server";

import { homeCardAdvertisement } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const lofts: homeCardAdvertisement[] = [
      {
        id: "1",
        slugUrl: "/lofts/1",
        category: "apartamentos",
        title: "Loft Compacto",
        images: "https://images.unsplash.com/photo-1572120360610-d971b9b639d1",
        price: 280_000,
        advertiser_id: "adv-1",
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
        id: "2",
        slugUrl: "/lofts/2",
        category: "apartamentos",
        title: "Loft Industrial",
        images: "https://images.unsplash.com/photo-1560448070-62f85d3745e5",
        price: 400_000,
        advertiser_id: "adv-2",
        advertiser_type: "free",
        advertiser: {
          name: "Fernanda Ribeiro Alcantara",
          image: "https://i.pravatar.cc/150?img=8",
        },
        address: {
          city: "Porto Alegre",
          neighbourhood: "Moinhos de Vento",
          state: "RS",
        },
        options: {
          propertyMetrics: {},
        },
        createdAt: new Date(),
      },
    ];

    return NextResponse.json({
      message: "Subscriptions fetched successfully",
      error: null,
      data: lofts,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Failed to fetch subscriptions",
      error: err instanceof Error ? err.message : "Unknown error",
      data: null,
    }, { status: 500 });
  }
}


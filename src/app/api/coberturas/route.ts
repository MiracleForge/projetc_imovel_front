import { homeCardAdvertisement } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const coberturas: homeCardAdvertisement[] = [
      {
        id: "1",
        slugUrl: "/coberturas/1",
        category: "apartamentos",
        title: "Cobertura Luxuosa",
        images: "https://images.unsplash.com/photo-1599423300746-b62533397364",
        price: 1_250_000,
        advertiser_id: "adv-3",
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
        id: "2",
        slugUrl: "/coberturas/2",
        category: "apartamentos",
        title: "Cobertura Moderna",
        images: "https://images.unsplash.com/photo-1572120360610-d971b9b639d1",
        price: 980_000,
        advertiser_id: "adv-4",
        advertiser_type: "free",
        advertiser: {
          name: "Thiago Santos",
          image: "https://i.pravatar.cc/150?img=9",
        },
        address: {
          city: "Rio de Janeiro",
          neighbourhood: "Ipanema",
          state: "RJ",
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
      data: coberturas,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Failed to fetch subscriptions",
        error: err instanceof Error ? err.message : "Unknown error",
        data: null,
      },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { homeCardAdvertisement } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";

export async function GET() {
  try {
    const apartamentos: homeCardAdvertisement[] = [
      {
        id: "1",
        slugUrl: "/apartamentos/1",
        category: "apartamentos",
        title: "Apartamento Moderno",
        images: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        price: 350_000,
        advertiser_id: "adv-1",
        advertiser_type: "free",
        advertiser: {
          name: "João Silva",
          image: "https://i.pravatar.cc/150?img=1",
        },
        address: {
          city: "São Paulo",
          neighbourhood: "Vila Madalena",
          state: "SP",
        },
        options: {
          propertyMetrics: {},
        },
        createdAt: new Date(),
      },
      {
        id: "2",
        slugUrl: "/apartamentos/2",
        category: "apartamentos",
        title: "Apartamento Compacto",
        images: "https://images.unsplash.com/photo-1560448070-62f85d3745e5",
        price: 300_000,
        advertiser_id: "adv-7",
        advertiser_type: "paid",
        advertiser: {
          name: "Lucas Martins",
          image: "https://i.pravatar.cc/150?img=7",
        },
        address: {
          city: "São Paulo",
          neighbourhood: "Pinheiros",
          state: "SP",
        },
        options: {
          propertyMetrics: {},
        },
        createdAt: new Date(),
      },
    ];

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return NextResponse.json({
      message: "Subscriptions fetched successfully",
      error: null,
      data: apartamentos,
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

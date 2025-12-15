import { NextResponse } from "next/server";

const coberturas = [
  {
    title: "Cobertura Luxuosa",
    cardUrl: "/coberturas/1",
    brand: { label: "PrimeResidences", icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
    cardImage: "https://images.unsplash.com/photo-1599423300746-b62533397364",
    price: 1250000,
    address: { city: "São Paulo", locality: "Jardins" },
    user: { avatar: "https://i.pravatar.cc/150?img=4", name: "Ana Souza" },
  },
  {
    title: "Cobertura Moderna",
    cardUrl: "/coberturas/2",
    brand: { label: "PrimeResidences", icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
    cardImage: "https://images.unsplash.com/photo-1572120360610-d971b9b639d1",
    price: 980000,
    address: { city: "Rio de Janeiro", locality: "Ipanema" },
    user: { avatar: "https://i.pravatar.cc/150?img=9", name: "Thiago Santos" },
  }
];

export async function GET() {
  return NextResponse.json(coberturas);
}


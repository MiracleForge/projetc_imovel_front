import { NextResponse } from "next/server";

const lofts = [
  {
    title: "Loft Compacto",
    cardUrl: "/lofts/1",
    brand: { label: "CityLofts", icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
    cardImage: "https://images.unsplash.com/photo-1572120360610-d971b9b639d1",
    price: 280000,
    address: { city: "Belo Horizonte", locality: "Savassi" },
    user: { avatar: "https://i.pravatar.cc/150?img=3", name: "Carlos Pereira", isRealtor: true },
  },
  {
    title: "Loft Industrial",
    cardUrl: "/lofts/2",
    brand: { label: "CityLofts", icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
    cardImage: "https://images.unsplash.com/photo-1560448070-62f85d3745e5",
    price: 400000,
    address: { city: "Porto Alegre", locality: "Moinhos de Vento" },
    user: { avatar: "https://i.pravatar.cc/150?img=8", name: "Fernanda Ribeiro", isRealtor: true },
  }
];

export async function GET() {
  return NextResponse.json(lofts);
}


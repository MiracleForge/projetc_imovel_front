import { NextResponse } from "next/server";

const apartamentos = [
  {
    title: "Apartamento Moderno",
    cardUrl: "/apartamentos/1",
    brand: { label: "UrbanHomes", icon: "https://images.unsplash.com/photo-1560448204-4e0b7fdbf4d2" },
    cardImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 350000,
    address: { city: "São Paulo", locality: "Vila Madalena" },
    user: { avatar: "https://i.pravatar.cc/150?img=1", name: "João Silva", isRealtor: true },
  },
  {
    title: "Apartamento Compacto",
    cardUrl: "/apartamentos/2",
    brand: { label: "UrbanHomes", icon: "https://images.unsplash.com/photo-1560448204-4e0b7fdbf4d2" },
    cardImage: "https://images.unsplash.com/photo-1560448070-62f85d3745e5",
    price: 300000,
    address: { city: "São Paulo", locality: "Pinheiros" },
    user: { avatar: "https://i.pravatar.cc/150?img=7", name: "Lucas Martins" },
  }
];

export async function GET() {
  return NextResponse.json(apartamentos);
}


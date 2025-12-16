import { NextResponse } from "next/server";

const casas = [
  {
    title: "Casa com Jardim",
    cardUrl: "/casas/1",
    brand: { label: "GreenLiving", icon: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    cardImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 750000,
    address: { city: "Rio de Janeiro", locality: "Barra da Tijuca" },
    user: { avatar: "https://i.pravatar.cc/150?img=2", name: "Maria Oliveira" },
  },
  {
    title: "Casa Rústica Atualizada",
    cardUrl: "/casas/2",
    brand: { label: "RusticHomes", icon: "https://images.unsplash.com/photo-1523217582562-09d0def993a6" },
    cardImage: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
    price: 450000,
    address: { city: "Curitiba", locality: "Batel" },
    user: { avatar: "https://i.pravatar.cc/150?img=6", name: "Paula Lima" },
  }
];

export async function GET() {
  return NextResponse.json(casas);
}


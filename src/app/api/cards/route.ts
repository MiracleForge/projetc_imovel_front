import { NextResponse } from "next/server";

// Seu JSON de 15 cards
export const cards = [
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
    title: "Casa com Jardim",
    cardUrl: "/casas/2",
    brand: { label: "GreenLiving", icon: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    cardImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 750000,
    address: { city: "Rio de Janeiro", locality: "Barra da Tijuca" },
    user: { avatar: "https://i.pravatar.cc/150?img=2", name: "Maria Oliveira" },
  },
  {
    title: "Loft Compacto",
    cardUrl: "/lofts/3",
    brand: { label: "CityLofts", icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
    cardImage: "https://images.unsplash.com/photo-1572120360610-d971b9b639d1",
    price: 280000,
    address: { city: "Belo Horizonte", locality: "Savassi" },
    user: { avatar: "https://i.pravatar.cc/150?img=3", name: "Carlos Pereira", isRealtor: true },
  },
  {
    title: "Cobertura Luxuosa",
    cardUrl: "/coberturas/4",
    brand: { label: "PrimeResidences", icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
    cardImage: "https://images.unsplash.com/photo-1599423300746-b62533397364",
    price: 1250000,
    address: { city: "São Paulo", locality: "Jardins" },
    user: { avatar: "https://i.pravatar.cc/150?img=4", name: "Ana Souza" },
  },
  {
    title: "Apartamento à Beira-Mar",
    cardUrl: "/apartamentos/5",
    brand: { label: "BeachLife", icon: "https://images.unsplash.com/photo-1501183638710-841dd1904471" },
    cardImage: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
    price: 650000,
    address: { city: "Florianópolis", locality: "Jurerê" },
    user: { avatar: "https://i.pravatar.cc/150?img=5", name: "Rafael Costa" },
  },
  {
    title: "Casa Rústica",
    cardUrl: "/casas/6",
    brand: { label: "RusticHomes", icon: "https://images.unsplash.com/photo-1523217582562-09d0def993a6" },
    cardImage: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
    price: 450000,
    address: { city: "Curitiba", locality: "Batel" },
    user: { avatar: "https://i.pravatar.cc/150?img=6", name: "Paula Lima" },
  },
  {
    title: "Apartamento Compacto",
    cardUrl: "/apartamentos/7",
    brand: { label: "UrbanHomes", icon: "https://images.unsplash.com/photo-1560448204-4e0b7fdbf4d2" },
    cardImage: "https://images.unsplash.com/photo-1560448204-4e0b7fdbf4d2",
    price: 300000,
    address: { city: "São Paulo", locality: "Pinheiros" },
    user: { avatar: "https://i.pravatar.cc/150?img=7", name: "Lucas Martins" },
  },
  {
    title: "Loft Industrial",
    cardUrl: "/lofts/8",
    brand: { label: "CityLofts", icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
    cardImage: "https://images.unsplash.com/photo-1560448070-62f85d3745e5",
    price: 400000,
    address: { city: "Porto Alegre", locality: "Moinhos de Vento" },
    user: { avatar: "https://i.pravatar.cc/150?img=8", name: "Fernanda Ribeiro", isRealtor: true },
  },
  {
    title: "Cobertura Moderna",
    cardUrl: "/coberturas/9",
    brand: { label: "PrimeResidences", icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
    cardImage: "https://images.unsplash.com/photo-1572120360610-d971b9b639d1",
    price: 980000,
    address: { city: "Rio de Janeiro", locality: "Ipanema" },
    user: { avatar: "https://i.pravatar.cc/150?img=9", name: "Thiago Santos" },
  },
  {
    title: "Casa de Campo",
    cardUrl: "/casas/10",
    brand: { label: "GreenLiving", icon: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    cardImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 520000,
    address: { city: "Campos do Jordão", locality: "Capivari" },
    user: { avatar: "https://i.pravatar.cc/150?img=10", name: "Juliana Ferreira" },
  }
  // você pode continuar até 15 seguindo o mesmo padrão
];
export async function GET() {
  console.log("done")
  return NextResponse.json(cards);
}


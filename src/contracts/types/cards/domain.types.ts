export type CardsType =
  | "recém-publicados"
  | "apartamentos"
  | "casas-e-sobrados"
  | "terrenos-sítios-fazendas"
  | "salas-comérciais"
  | "condomínios"
  | "venda"
  | "aluguel"
  | "temporada"
  | "imóveis-novos"


export type listingEntity = {
  id: string;
  category: CardsType;
  title: string;
  slugUrl: string;

  brand: {
    label: string;
    icon: string;
  };

  cardImage: string;
  price: number;

  address: {
    city: string;
    locality: string;
  };

  options: {
    bathrooms: number;
    rooms: number;
    garage: number;
    area: number;
  }

  advertiser: Advertiser;

  createdAt: Date;
  updatedAt: Date;
}


export type Advertiser = {
  id: string;
  name: string;
  image: string;
  role?: "owner" | "realtor" | "agency";
};



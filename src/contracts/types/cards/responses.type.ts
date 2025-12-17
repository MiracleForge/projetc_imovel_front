export type Advertiser = {
  id: string;
  name: string;
  image: string;
  role?: "owner" | "realtor" | "agency";
};

export type ItemInscriptionPanel = {
  spaceId: string;
  advertiser: Advertiser;
  hasNewPublication: boolean;
};


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


export interface HomeCardProps {
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

  advertiser: Advertiser;

  createdAt: Date;
}


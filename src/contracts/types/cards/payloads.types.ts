export type HomeCards = {
  price: number;
  title: string;
  cardUrl: string;
  cardImage: string;
  address: {
    city: string;
    locality: string;
  };
  brand: {
    icon: string;
    label: string;
  };
  user: {
    avatar: string;
    name: string;
  }
}

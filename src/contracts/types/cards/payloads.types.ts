export type HomeCards = {
  category: string;
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
  created_at: Date;
}

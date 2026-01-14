type MarketingItem = {
  img: {
    imgSrc: string;
    imgAlt: string;
  };
  title: string;
  subTitle: string;
};

export const MARKETING_ITEMS: MarketingItem[] = [
  {
    img: {
      imgSrc: "/miscellaneous/box-tick.svg",
      imgAlt: "Publicação rápida de imóveis",
    },
    title: "Anuncie em Minutos",
    subTitle: "Publique seu imóvel de forma simples e rápida",
  },
  {
    img: {
      imgSrc: "/miscellaneous/shield-security.svg",
      imgAlt: "Segurança nos anúncios",
    },
    title: "Mais Segurança",
    subTitle: "Anúncios moderados e perfis verificados",
  },
  {
    img: {
      imgSrc: "/miscellaneous/crown.svg",
      imgAlt: "Destaque para anúncios",
    },
    title: "Mais Visibilidade",
    subTitle: "Destaque seu imóvel e alcance mais pessoas",
  },
] as const;



export type MarketingKey =
  | "fast_publish"
  | "security"
  | "visibility"
  | "flex_visits"
  | "verified_sales"
  | "imobily_user";


export type MarketingItem = {
  key: MarketingKey;
  img: {
    imgSrc: string;
    imgAlt: string;
  };
  title: string;
  subTitle: string;
};



export const MARKETING_MAP: Record<MarketingKey, MarketingItem> = {
  fast_publish: {
    key: "fast_publish",
    img: {
      imgSrc: "/miscellaneous/box-tick.svg",
      imgAlt: "Publicação rápida de imóveis",
    },
    title: "Anuncie em Minutos",
    subTitle: "Publique seu imóvel de forma simples e rápida",
  },

  security: {
    key: "security",
    img: {
      imgSrc: "/miscellaneous/shield-security.svg",
      imgAlt: "Segurança nos anúncios",
    },
    title: "Mais Segurança",
    subTitle: "Anúncios moderados e perfis verificados",
  },

  visibility: {
    key: "visibility",
    img: {
      imgSrc: "/miscellaneous/crown.svg",
      imgAlt: "Destaque para anúncios",
    },
    title: "Mais Visibilidade",
    subTitle: "Destaque seu imóvel e alcance mais pessoas",
  },

  flex_visits: {
    key: "flex_visits",
    img: {
      imgSrc: "/miscellaneous/box-tick.svg",
      imgAlt: "Publicação rápida de imóveis",
    },
    title: "Visitas Flexíveis",
    subTitle: "Aberto para visitas em horários convenientes",
  },

  verified_sales: {
    key: "verified_sales",
    img: {
      imgSrc: "/miscellaneous/shield-security.svg",
      imgAlt: "Segurança nos anúncios",
    },
    title: "Vendas Comprovadas",
    subTitle: "Informações conferidas pela plataforma",
  },

  imobily_user: {
    key: "imobily_user",
    img: {
      imgSrc: "/miscellaneous/crown.svg",
      imgAlt: "Destaque para anúncios",
    },
    title: "Usuário Imobily",
    subTitle: "Usuário Imobily com 2 anos",
  },
};


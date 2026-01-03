// ------------------
// FONTS OF TRUTH used to replecate this data everywhere 
// ------------------

export const adversetimentCategoriesData = [
  "apartamentos",
  "casas-e-sobrados",
  "terrenos-sítios",
  "salas-comerciais",
  "condomínios",
] as const;

export const transactionMode = [
  "venda",
  "aluguel",
  "temporada",
]

export const marketingCategoriesData = [
  "recém-publicados",
  "imóveis-novos",
  "venda",
] as const;

export const allCategoriesData = [
  ...marketingCategoriesData, ...adversetimentCategoriesData, ...transactionMode
] as const;


export const metricsIconsMap: Record<string, string> = {
  rooms: "/icons/metrics/quartos-icon.svg",
  bathrooms: "/icons/metrics/banheiros-icon.svg",
  garage: "/icons/metrics/garagem-icon.svg",
  area: "/icons/metrics/area-icon.svg",
};

export const amenityIconsMap: Record<string, string> = {
  academy: "/icons/options/academy-options.svg",
  balcony: "/icons/options/balcony-options.svg",
  pool: "/icons/options/pool-options.svg",
  service_area: "/icons/options/service-area-options.svg",
  service_room: "/icons/options/service-room-options.svg",
};

export const condominionIconsMap: Record<string, string> = {
  academy: "/icons/options/academy-options.svg",
  allow_animals: "/icons/options/allow-animals-options.svg",
  close_condominion: "/icons/options/close_condominion-options.svg",
  elevator: "/icons/options/elevator-options.svg",
  gate_house: "/icons/options/gate-house-options.svg",
};

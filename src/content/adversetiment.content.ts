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


export const propertyMetricsConfig = [
  {
    field: "area",
    label: "Área",
    icon: "/icons/metrics/area-icon.svg",
  },
  {
    field: "rooms",
    label: "Quartos",
    icon: "/icons/metrics/quartos-icon.svg",
  },
  {
    field: "bathrooms",
    label: "Banheiros",
    icon: "/icons/metrics/banheiros-icon.svg",
  },
  {
    field: "garage",
    label: "Garagem",
    icon: "/icons/metrics/garagem-icon.svg",
  },
] as const;

export const amenityIconsMap: Record<string, string> = {
  academy: "/icons/options/academy-options.svg",
  balcony: "/icons/options/balcony-options.svg",
  pool: "/icons/options/pool-options.svg",
  service_area: "/icons/options/service-area-options.svg",
  service_room: "/icons/options/service-room-options.svg",
};


export const amenitiesConfig = [
  {
    field: "academy",
    label: "Academia",
  },
  {
    field: "balcony",
    label: "Sacada",
  },
  {
    field: "pool",
    label: "Piscina",
  },
  {
    field: "service_area",
    label: "Área de Serviço",
  },
  {
    field: "service_room",
    label: "Quarto de Serviço",
  },
] as const;

export const condominionIconsMap: Record<string, string> = {
  academy: "/icons/options/academy-options.svg",
  allow_animals: "/icons/options/allow-animals-options.svg",
  close_condominion: "/icons/options/close_condominion-options.svg",
  elevator: "/icons/options/elevator-options.svg",
  gate_house: "/icons/options/gate-house-options.svg",
};

export const brazilStates = [
  { code: "AC", name: "Acre" },
  { code: "AL", name: "Alagoas" },
  { code: "AP", name: "Amapá" },
  { code: "AM", name: "Amazonas" },
  { code: "BA", name: "Bahia" },
  { code: "CE", name: "Ceará" },
  { code: "DF", name: "Distrito Federal" },
  { code: "ES", name: "Espírito Santo" },
  { code: "GO", name: "Goiás" },
  { code: "MA", name: "Maranhão" },
  { code: "MT", name: "Mato Grosso" },
  { code: "MS", name: "Mato Grosso do Sul" },
  { code: "MG", name: "Minas Gerais" },
  { code: "PA", name: "Pará" },
  { code: "PB", name: "Paraíba" },
  { code: "PR", name: "Paraná" },
  { code: "PE", name: "Pernambuco" },
  { code: "PI", name: "Piauí" },
  { code: "RJ", name: "Rio de Janeiro" },
  { code: "RN", name: "Rio Grande do Norte" },
  { code: "RS", name: "Rio Grande do Sul" },
  { code: "RO", name: "Rondônia" },
  { code: "RR", name: "Roraima" },
  { code: "SC", name: "Santa Catarina" },
  { code: "SP", name: "São Paulo" },
  { code: "SE", name: "Sergipe" },
  { code: "TO", name: "Tocantins" },
];


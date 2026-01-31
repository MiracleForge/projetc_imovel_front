// ------------------
// FONTS OF TRUTH used to replicate this data everywhere
// ------------------

import { advertisementPage } from "../contracts/DTOs/advertisement/views/advertisement.card.dto";

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
] as const;

export const marketingCategoriesData = [
  "recém-publicados",
  "imóveis-novos",
  "venda",
] as const;

export const allCategoriesData = [
  ...marketingCategoriesData,
  ...adversetimentCategoriesData,
  ...transactionMode,
] as const;

type MetricConfig = {
  field: keyof advertisementPage["options"]["propertyMetrics"];
  label: string;
  icon: string;
  formatter?: (value: number | string | boolean) => string;
};

export const propertyMetricsConfig: MetricConfig[] = [
  {
    field: "area",
    label: "Área",
    icon: "/icons/metrics/area-icon.svg",
    formatter: (value) => `${value} m²`,
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


export const amenitiesConfig = [
  {
    field: "academy",
    label: "Academia",
    icon: "/icons/options/academy-options.svg",
  },
  {
    field: "service_room",
    label: "Quarto de serviço",
    icon: "/icons/options/service-room-options.svg",
  },
  {
    field: "service_area",
    label: "Área de serviço",
    icon: "/icons/options/service-area-options.svg",
  },
  {
    field: "pool",
    label: "Piscina",
    icon: "/icons/options/pool-options.svg",
  },
  {
    field: "balcony",
    label: "Sacada",
    icon: "/icons/options/balcony-options.svg",
  },
] as const;


export const condominiumConfig = [
  {
    field: "academy",
    label: "Academia",
    icon: "/icons/options/academy-options.svg",
  },
  {
    field: "allow_animals",
    label: "Permite animais",
    icon: "/icons/options/allow-animals-options.svg",
  },
  {
    field: "close_condominion",
    label: "Condomínio fechado",
    icon: "/icons/options/close-condominion-options.svg",
  },
  {
    field: "elevator",
    label: "Elevador",
    icon: "/icons/options/elevator-options.svg",
  },
  {
    field: "gate_house",
    label: "Portaria",
    icon: "/icons/options/gate-house-options.svg",
  },
  {
    field: "party_saloon",
    label: "Salão de festas",
    icon: "/icons/options/party-saloon-options.svg",
  },
  {
    field: "security",
    label: "Segurança",
    icon: "/icons/options/security-options.svg",
  },
] as const;


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


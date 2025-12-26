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

import { CardsType } from "../contracts/types/cards/responses.type";

export const categoryData: { name: CardsType }[] = [
  { name: "recém-publicados" },        // novidade chama atenção
  { name: "imóveis-novos" },            // alto interesse / valorização
  { name: "venda" },                    // intenção principal
  { name: "aluguel" },                  // segunda intenção principal
  { name: "apartamentos" },             // tipo mais buscado
  { name: "casas-e-sobrados" },          // segundo mais comum
  { name: "condomínios" },               // variação de moradia
  { name: "terrenos-sítios-fazendas" },  // nicho mais específico
  { name: "temporada" },                 // uso específico
  { name: "salas-comérciais" },          // nicho profissional
];


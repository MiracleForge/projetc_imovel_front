import HomeCard from "@/src/components/ui/cards/HomeCard.ui"
import { HomeCards } from "@/src/contracts/types/cards/payloads.types";
import { createFetcher } from "@/src/utils/fetchData"


interface CardWrapperProps {
  query: string;
  lazyLoading: boolean;
};

export default async function CardWrapper({ query, lazyLoading }: CardWrapperProps) {

  const path = `/homecards/${query}`
  const tempPath = "https://free.mockerapi.com/mock/b148a58f-c286-4328-8c75-75ad20c7a71d";
  const fetchCardCategory = createFetcher<undefined, HomeCards[]>(
    tempPath,
    { method: "GET", isPublic: true, raw: true }
  );

  const response = await fetchCardCategory();
  const cards = response;
  console.log(response)
  if (!cards || !Array.isArray(cards)) return null;

  console.log(cards)
  return (
    <div className="mt-16">
      <div className="flex justify-between text-2xl">
        <h3 className="text-gray-600 font-medium">Recém Publicados</h3>
        <p className="uppercase font-bold text-terciary-blue items-center">HOJE! <span className="bg-terciary-blue py-2 px-3 md:px-4 rounded-r-2xl ml-2 lg:ml-4" /></p>
      </div>
      <div className="flex flex-row overflow-x-scroll no-scrollbar gap-6 mt-6 px-2">
        {cards.map((card, index) => (
          <HomeCard key={`Card ${query + index}`} {...card} />
        ))}
      </div>
    </div>
  )
}

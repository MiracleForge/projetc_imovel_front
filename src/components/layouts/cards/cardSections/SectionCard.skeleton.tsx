import CardSkeleton from "@/src/components/ui/cards/HomeCardSkeleton.cards";

export default function SectionCardSkeleton() {
  return (
    <div className="wrapper-cards-container animate-pulse overflow-hidden">
      <div className="wrapper-cards-header">
        <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
      <ul className="w-max shrink-0 inline-flex items-center space-x-3 font-medium leading-7 whitespace-nowrap py-1 px-1 rounded-lg gap-6">
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}

      </ul>
    </div>
  );
}



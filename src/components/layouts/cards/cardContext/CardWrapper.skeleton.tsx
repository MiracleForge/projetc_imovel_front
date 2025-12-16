import CardSkeleton from "@/src/components/ui/cards/HomeCardSkeleton.cards";

export default function WrapperCardSkeleton() {
  return (
    <div className="wrapper-cards-container animate-pulse overflow-hidden">
      <div className="wrapper-cards-header">
        <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="wrapper-cards-list">
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}



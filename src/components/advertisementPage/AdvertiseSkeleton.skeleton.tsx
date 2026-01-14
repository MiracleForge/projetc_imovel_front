export default function AdvertisementSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="h-6 bg-gray-200 rounded w-1/4" />
      <div className="aspect-square h-full max-h-[550px] w-full bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}



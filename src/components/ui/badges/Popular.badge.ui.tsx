export default function PopularBadge({ text }: { text: string }) {
  return <div className="absolute -top-1 -right-1">
    <div className="relative">
      <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full blur-sm animate-pulse" />
      <span className="relative inline-flex items-center gap-1 px-4 py-2 rounded-full bg-linear-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold shadow-lg">
        {text}
      </span>
    </div>
  </div>
}

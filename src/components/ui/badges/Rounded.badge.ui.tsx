export default function RoundedBadge({ text }: { text: string }) {
  return (
    <div className="absolute top-10 left-8">
      <div className="relative">
        <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50" />
        <span className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-secundary-blue font-black text-lg shadow-xl">
          {text}
        </span>
      </div>
    </div>
  )
}

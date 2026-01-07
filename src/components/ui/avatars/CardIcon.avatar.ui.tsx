export default function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mb-4 mt-8">
      <div className="relative">
        <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-50 animate-pulse" />
        <div className="relative p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
          {children}
        </div>
      </div>
    </div>
  )
}

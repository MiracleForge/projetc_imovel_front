export default function ShinnyBadge({ text, icon }: { text: string, icon: string }) {
  return <div className="absolute top-4 left-4">
    <div className="relative">
      <div className="absolute inset-0 bg-white rounded-xl blur-md opacity-50" />
      <div className="relative px-3 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
        <span className="text-white font-black text-xs tracking-wider flex items-center gap-1">
          {icon}
          {text}
        </span>
      </div>
    </div>
  </div>
}

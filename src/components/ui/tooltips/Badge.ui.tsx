export default function Badge({ label, icon }: { label: string, icon?: string }) {
  return <span className="inline-block mb-3 rounded-full bg-blue-100 px-4 py-1 text-xs font-bold text-blue-700">
    {icon} {label}
  </span>
}

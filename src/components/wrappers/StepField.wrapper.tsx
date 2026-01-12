
export default function StepField(
  { label,
    children,
  }: {
    label?: string;
    children: React.ReactNode;
  }) {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{label}</h2>
      {children}
    </div>
  )
}

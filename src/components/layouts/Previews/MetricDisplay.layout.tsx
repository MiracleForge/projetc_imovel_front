interface MetricDisplayProps {
  label: string;
  iconKey: string;
  iconsMap: Record<string, string>;
  value: number | string | boolean;
}

export function MetricDisplay({
  label,
  iconKey,
  iconsMap,
  value,
}: MetricDisplayProps) {
  const iconSrc = iconsMap[iconKey] ?? iconsMap["default"];
  const isBoolean = typeof value === "boolean";

  return (
    <div
      className="
        flex items-center justify-center gap-2
        p-3 border border-foreground rounded-lg
        bg-[#F3F5FF]
        whitespace-nowrap
      "
    >
      <img
        src={iconSrc}
        alt={label}
        className="w-6 h-6 object-contain shrink-0"
      />

      <span className="text-sm font-medium capitalize">
        {isBoolean ? label : `${label}: ${value}`}
      </span>
    </div>
  );
}


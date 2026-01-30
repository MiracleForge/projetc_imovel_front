interface MetricDisplayProps {
  label: string;
  iconKey: string;
  iconsMap: Record<string, string>;
  value: number | string;
}

export function MetricDisplay({
  label,
  iconKey,
  iconsMap,
  value
}: MetricDisplayProps) {
  const iconSrc = iconsMap[iconKey] ?? iconsMap["default"];

  return (
    <div
      className={`
        flex items-center gap-4 w-full md:w-1/3 p-4 border border-foreground rounded-lg
        transition-all duration-300 bg-[#F3F5FF]
      `}
    >
      <div className="flex items-center gap-3">
        <img
          src={iconSrc}
          alt={label}
          className="w-8 h-8 object-contain"
        />

        <span className="text-sm font-medium capitalize">
          {label}
        </span>
      </div>

      <span className="ml-auto w-[40%] p-2 border border-foreground rounded-md bg-white text-center font-semibold">
        {value}
      </span>
    </div>
  );
}


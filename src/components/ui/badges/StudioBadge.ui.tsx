type StudioBadgeSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<StudioBadgeSize, string> = {
      sm: "w-32 text-sm py-1",
      md: "w-44 text-xs py-1.5 shadow-[0_3px_0_rgb(30,58,138)]",
      lg: "w-52 text-sm py-2 shadow-[0_4px_0_rgb(30,58,138)]",
      xl: "w-60 text-sm py-2 shadow-[0_4px_0_rgb(30,58,138)]", // atual
};

export default function StudioBadge({
      text,
      size = "xl",
}: {
      text: string;
      size?: StudioBadgeSize;
}) {
      return (
            <div className={`${sizeMap[size]} rotate-45 origin-top-right z-20`}>
                  <div
                        className="
                        py-0.5
                        bg-linear-to-r from-secundary-blue via-terciary-blue to-secundary-blue
                        border border-blue-700
                        transition-all duration-300 ease-out
                        group-hover:-translate-y-[3px]
                        active:translate-y-px
                        before:absolute before:inset-0 
                        before:bg-linear-to-r before:from-transparent before:via-white/30 before:to-transparent
                        before:-skew-x-12
                        before:translate-x-[-150%]
                        before:transition-transform before:duration-700
                        group-hover:before:translate-x-[150%]
                        after:absolute after:inset-0 after:rounded-xl
                        after:bg-blue-500/40 after:blur-sm after:opacity-0
                        transition-all
                        group-hover:after:opacity-100
                        ring-1 ring-inset ring-white/10
                        text-white font-bold text-center shadow-lg"
                  >
                        {text}
                  </div>
            </div>
      );
}


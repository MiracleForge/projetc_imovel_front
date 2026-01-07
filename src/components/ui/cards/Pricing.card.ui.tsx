import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import StudioBadge from "../badges/StudioBadge.ui";
import RoundedBadge from "../badges/Rounded.badge.ui";
import ShinnyEffect from "../effects/ShinnyEffect.ui";
import PopularBadge from "../badges/Popular.badge.ui";
import Badge from "../tooltips/Badge.ui";


const cardVariants = cva(
  "group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 transform hover:-translate-y-2",
  {
    variants: {
      variant: {
        free: "",
        highlighted: "",
        studio: ""
      },
      selected: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      {
        variant: "free",
        selected: true,
        className: "bg-linear-to-br from-blue-50 via-white to-blue-50 shadow-2xl scale-[1.02] ring-4 ring-blue-400"
      },
      {
        variant: "free",
        selected: false,
        className: "bg-white shadow-lg hover:shadow-xl border-2 border-gray-200"
      },
      {
        variant: "highlighted",
        selected: true,
        className: "bg-linear-to-br from-purple-600 via-purple-500 to-indigo-700 shadow-2xl scale-[1.02] ring-4 ring-purple-400"
      },
      {
        variant: "highlighted",
        selected: false,
        className: "bg-linear-to-br from-purple-600 to-indigo-700 shadow-xl hover:shadow-2xl border-2 border-purple-400"
      },
      {
        variant: "studio",
        selected: true,
        className: "bg-linear-to-br from-secundary-blue via-terciary-blue to-blue-700 shadow-2xl scale-[1.02] ring-4 ring-blue-400"
      },
      {
        variant: "studio",
        selected: false,
        className: "bg-linear-to-br from-secundary-blue to-blue-700 shadow-xl hover:shadow-2xl"
      }
    ]
  }
);

const titleVariants = cva("text-3xl font-black text-center mb-3", {
  variants: {
    variant: {
      free: "bg-linear-to-r from-secundary-blue to-terciary-blue bg-clip-text text-transparent",
      highlighted: "text-white drop-shadow-lg",
      studio: "text-white drop-shadow-lg"
    }
  }
});

const descriptionVariants = cva("text-center text-sm mb-6 leading-relaxed px-2", {
  variants: {
    variant: {
      free: "text-gray-600",
      highlighted: "text-white/90 font-medium",
      studio: "text-white/90 font-medium"
    }
  }
});

const iconBackgroundVariants = cva("absolute inset-0 rounded-2xl blur-xl opacity-50 animate-pulse", {
  variants: {
    variant: {
      free: "bg-blue-100 group-hover:bg-blue-200",
      highlighted: "bg-white",
      studio: ""
    },
    selected: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    {
      variant: "free",
      selected: true,
      className: "bg-terciary-blue scale-110"
    }
  ]
});

const iconColorVariants = cva("w-12 h-12 transition-colors duration-300", {
  variants: {
    variant: {
      free: "",
      highlighted: "text-white transform group-hover:scale-110 transition-transform duration-300",
      studio: "text-white transform group-hover:scale-110 transition-transform duration-300"
    },
    selected: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    {
      variant: "free",
      selected: true,
      className: "text-white"
    },
    {
      variant: "free",
      selected: false,
      className: "text-secundary-blue"
    }
  ]
});

const checkIconVariants = cva("w-5 h-5 shrink-0 mt-0.5", {
  variants: {
    variant: {
      free: "text-terciary-blue",
      highlighted: "",
      studio: ""
    }
  }
});

const featureTextVariants = cva("text-sm", {
  variants: {
    variant: {
      free: "text-gray-700",
      highlighted: "text-white font-medium",
      studio: "text-white font-medium"
    }
  }
});

const bottomBadgeVariants = cva("inline-block px-6 py-2 rounded-full font-semibold text-sm", {
  variants: {
    variant: {
      free: "bg-linear-to-r from-blue-100 to-blue-50 text-blue-700 shadow-sm",
      highlighted: "bg-white text-secundary-blue font-bold shadow-xl",
      studio: ""
    }
  }
});

const selectionIndicatorVariants = cva("flex items-center justify-center rounded-full shadow-2xl", {
  variants: {
    variant: {
      free: "w-8 h-8 bg-terciary-blue",
      highlighted: "w-10 h-10 bg-white animate-bounce",
      studio: "w-10 h-10 bg-white animate-bounce"
    }
  }
});

const selectionIconVariants = cva("", {
  variants: {
    variant: {
      free: "w-5 h-5 text-white",
      highlighted: "w-6 h-6 text-purple-600",
      studio: "w-6 h-6 text-secundary-blue"
    }
  }
});

interface Feature {
  icon?: string;
  text: string;
}

interface PricingCardProps extends VariantProps<typeof cardVariants> {
  variant: "free" | "highlighted" | "studio";
  selected: boolean;
  title: string;
  description: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  period?: string;
  badge?: {
    text: string;
    type: "simple" | "multiplier" | "studio" | "popular";
  };
  features: Feature[];
  bottomBadge?: string;
  ctaText?: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

export default function PricingCard({
  variant,
  selected,
  title,
  description,
  price,
  originalPrice,
  discount,
  period,
  badge,
  features,
  bottomBadge,
  ctaText,
  icon,
  onSelect
}: PricingCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={twMerge(clsx(cardVariants({ variant, selected })))}
    >
      {/* Efeito de brilho animado */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000" />

      {variant === "highlighted" && <ShinnyEffect />}

      <div className="absolute top-2 right-2 origin-top-right">
        {badge && badge.type === "simple" && <Badge label={badge.text} />}
      </div>
      <div className="absolute top-32 -right-8">
        {badge && badge.type === "studio" && <StudioBadge text={badge.text} />}
      </div>
      {badge && badge.type === "multiplier" && <RoundedBadge text={badge.text} />}
      {badge && badge.type === "popular" && <PopularBadge text={badge.text} />}

      <div className="flex justify-center mb-4 mt-8">
        <div className="relative">
          <div className={clsx(iconBackgroundVariants({ variant, selected }))} />
          <div className="relative p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
            <div className={clsx(iconColorVariants({ variant, selected }))}>
              {icon}
            </div>
          </div>
        </div>
      </div>

      {/* Título */}
      <h3 className={clsx(titleVariants({ variant }))}>{title}</h3>

      {/* Descrição */}
      <p className={clsx(descriptionVariants({ variant }))} dangerouslySetInnerHTML={{ __html: description }} />

      {/* Benefícios */}
      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            {variant === "free" ? (
              <svg className={clsx(checkIconVariants({ variant }))} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <div className="shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <span className={clsx(featureTextVariants({ variant }))}>{feature.text}</span>
          </div>
        ))}
      </div>

      {(variant === "highlighted" || variant === "studio") && price && (
        <div className="space-y-3 mb-6">
          <div className="text-center">
            {originalPrice && discount && (
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className={variant === "highlighted" ? "text-white/70 line-through text-sm" : "text-white/70 line-through text-sm"}>
                  {originalPrice}
                </span>
                <span className="px-2 py-1 rounded-full bg-yellow-400 text-purple-900 text-xs font-bold">
                  {discount}
                </span>
              </div>
            )}
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-black text-white">{price}</span>
              {period && <span className="text-white/80 text-sm">{period}</span>}
            </div>
          </div>

          {ctaText && variant === "highlighted" && (
            <button
              type="button"
              className="w-full py-3 rounded-xl bg-white text-purple-600 font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {ctaText}
            </button>
          )}
        </div>
      )}

      {bottomBadge && variant !== "highlighted" && variant !== "studio" && (
        <div className="text-center">
          <span className={clsx(bottomBadgeVariants({ variant }))}>{bottomBadge}</span>
        </div>
      )}

      {bottomBadge && (variant === "highlighted" || variant === "studio") && (
        <div className="text-center">
          <span className={`inline-block px-6 py-2 rounded-full font-bold text-sm shadow-xl ${variant === "highlighted" ? "bg-white text-purple-600" : "bg-white text-secundary-blue"
            }`}>
            {bottomBadge}
          </span>
        </div>
      )}

      {selected && (
        <div className={variant === "free" ? "absolute top-4 left-4" : "absolute bottom-4 left-1/2 -translate-x-1/2"}>
          <div className={clsx(selectionIndicatorVariants({ variant }))}>
            <svg className={clsx(selectionIconVariants({ variant }))} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
}

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const cardStyles = cva(
  "relative w-full rounded-2xl border p-5 text-left transition-all cursor-pointer select-none",
  {
    variants: {
      selected: {
        true: "border-blue-500 shadow-xl scale-[1.01]",
        false: "border-gray-200 shadow-md hover:shadow-lg hover:scale-[1.01]",
      },

      gradient: {
        none: "bg-white",
        blue: "bg-gradient-to-b from-secundary-blue/10 to-white",
        strongBlue: "bg-gradient-to-b from-terciary-blue/15 to-white",
      },

      pulse: {
        true: "",
        false: "",
      },
    },

    defaultVariants: {
      selected: false,
      gradient: "none",
      pulse: false,
    },
  }
);

type PlanCardProps = VariantProps<typeof cardStyles> & {
  title: string;
  price: string;
  description: string;
  features: string[];
  icon?: React.ReactNode; // ← qualquer SVG ou componente seu
  ribbon?: string;
  onSelect?: () => void;
};



export default function PlanCard({
  title,
  price,
  description,
  features,
  icon,
  ribbon,
  selected,
  onSelect,
  gradient,
  pulse,
}: PlanCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={twMerge(clsx(cardStyles({ selected, gradient })))}
    >
      {/* Ribbon */}
      {ribbon && (
        <div className="absolute top-3 -right-6 w-40 rotate-45 origin-top-right z-20">
          <div className="bg-gradient-to-r from-secundary-blue via-terciary-blue to-secundary-blue text-white text-[10px] font-bold py-1.5 text-center shadow-lg">
            {ribbon}
          </div>
        </div>
      )}

      {/* Pulse highlight */}
      {pulse && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-secundary-blue/40 animate-pulse pointer-events-none" />
      )}

      {/* Ícone */}
      {icon && <div className="flex justify-center mb-4">{icon}</div>}

      {/* Título */}
      <h3 className="text-lg font-bold text-gray-900 text-center">{title}</h3>

      {/* Preço */}
      <p className="text-text-blue font-bold text-center text-xl mt-1">{price}</p>

      {/* Descrição */}
      <p className="text-gray-500 text-sm text-center mt-2">{description}</p>

      {/* Divisor */}
      <div className="w-full h-[1px] bg-gray-200 my-4" />

      {/* Features */}
      <ul className="grid gap-2">
        {features.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
            <span className="w-2 h-2 rounded-full bg-secundary-blue" /> {/* mini bullet */}
            {item}
          </li>
        ))}
      </ul>
    </button>
  );
}


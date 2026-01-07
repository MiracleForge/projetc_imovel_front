import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const buttonVariants = cva(
  "block text-center hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-medium",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",

        secondary:
          "px-10 font-semibold py-1 shadow-[0px_3px_0px_0px_rgba(0,0,0,0.20)] border border-[#8C8C8C] bg-white",

        ghost: "bg-transparent text-black hover:bg-neutral-100",

        danger: "bg-red-600 text-white hover:bg-red-700",

        coal: "bg-black text-white font-bold text-xs",

        highlight: `
        relative
        px-10 py-2
        font-bold
        text-white
        uppercase
        tracking-wide

        bg-gradient-to-r from-secundary-blue via-terciary-blue to-secundary-blue
        border border-blue-700

        shadow-[0_4px_0_rgb(30,58,138)]
        rounded-xl

        transition-all duration-300 ease-out
        hover:-translate-y-[3px]
        hover:shadow-[0_6px_0_rgb(30,58,138)]
        active:translate-y-[1px]
        active:shadow-[0_2px_0_rgb(30,58,138)]

        before:absolute before:inset-0 
        before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
        before:-skew-x-12
        before:translate-x-[-150%]
        before:transition-transform before:duration-700

        hover:before:translate-x-[150%]

        after:absolute after:inset-0 after:rounded-xl
        after:bg-blue-500/40 after:blur-sm after:opacity-0
        transition-all
        hover:after:opacity-100

        ring-1 ring-inset ring-white/10
      `,
      },

      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-1.5 text-base",
        lg: "px-6 py-3 text-lg",
      },

      rounded: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-xl",
        full: "rounded-full",
      },

      shadows: {
        gosthly: "shadow-sm hover:shadow-md",
        hard: "shadow-[0px_3px_0px_0px_rgba(0,0,0,0.20)]",
      },
    },

    defaultVariants: {
      variant: "ghost",
      size: "md",
      rounded: "md",
      shadows: "gosthly",
    },
  }
);

interface CommumButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof buttonVariants> {
  label?: string;
  url: string;
  children?: ReactNode;
}

export default function CommumButton({
  label,
  url,
  children,
  variant,
  size,
  rounded,
  shadows,
  className,
  ...props
}: CommumButtonProps) {
  return (
    <Link
      href={url}
      role="button"
      {...props}
      className={twMerge(
        clsx(buttonVariants({ variant, size, shadows, rounded }), className)
      )}
    >
      {children}
      <span>{label}</span>
    </Link>
  );
}


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
        secondary: "px-10 font-semibold py-1 shadow-[0px_3px_0px_0px_rgba(0,0,0,0.20)] border border-[#8C8C8C] bg-white",
        ghost: "bg-transparent text-black hover:bg-neutral-100",
        danger: "bg-red-600 text-white hover:bg-red-700",
        coal: "bg-black text-white font-bold text-xs"
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
        hard: "shadow-[0px_3px_0px_0px_rgba(0,0,0,0.20)] "
      }
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
      rounded: "md",
      shadows: "gosthly"
    },
  }
);

interface CommumButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof buttonVariants> {
  label: string;
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
      className={twMerge(clsx(buttonVariants({ variant, size, shadows, rounded }), className))}
    >
      {children}
      <span>{label}</span>
    </Link>
  );
}


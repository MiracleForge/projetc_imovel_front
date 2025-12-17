import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  position: "left" | "right";
  size: "small" | "normal" | "large";
}

export default function ScrollButton({ position, size, ...props }: ButtonProps) {
  const sizeMap = {
    small: { p: "p-2", img: 12 },
    normal: { p: "p-3", img: 16 },
    large: { p: "p-4", img: 24 },
  };

  const { p, img } = sizeMap[size];

  return (
    <button
      role="tab"
      className={`absolute hidden md:block ${position === "left" ? "-left-4" : "-right-5"} -mx-3 top-1/2 -translate-y-1/2
        ${p} bg-[#F5F5F5] hover:bg-foreground hover:scale-110 
        rounded-full z-10 transition-transform duration-200`}
      {...props}
    >
      <Image
        src="/miscellaneous/arrow-vector.svg"
        alt=""
        width={img}
        height={img}
        className={position === "left" ? "rotate-180" : ""}
        priority={false}
      />
    </button>
  );
}


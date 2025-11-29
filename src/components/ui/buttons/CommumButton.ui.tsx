import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

interface CommumButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  url: string;
  image?: ReactNode
}

export default function CommumButton({ label, url, image, ...props }: CommumButtonProps) {
  return <Link
    href={url}
    role="button"
    {...props}
    className={`block text-center rounded-xl  bg-white  shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]transition-all duration-200 border-default font-normal ${props.className}`}
  >
    {image}
    <span>{label}</span>
  </Link>
}

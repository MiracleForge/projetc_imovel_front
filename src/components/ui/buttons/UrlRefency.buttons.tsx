"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  authenticated: boolean;
};

export default function UrlReferencyButton({ authenticated }: Props) {
  const pathname = usePathname();

  let href = "/auth/entrar";
  let label = "Entrar";

  if (authenticated) {
    href = "/dashboard";
    label = "Minha conta";
  }

  if (!authenticated && pathname === "/auth/entrar") {
    href = "/auth/registrar";
    label = "Criar conta";
  }

  if (!authenticated && pathname === "/auth/registrar") {
    href = "/auth/entrar";
    label = "Entrar";
  }

  return (
    <Link
      href={href}
      className="group border-2 border-black w-fit h-full p-2.5 text-center justify-center cursor-pointer
                 focus-within:border-black/20 focus-within:ring-[#FFFFFF]
                 hover:border-[#FFFFFF] duration-300 transition-colors"
    >
      <span className="font-medium leading-6 text-black transition-colors group-hover:text-white">
        {label}
      </span>
    </Link>
  );
}


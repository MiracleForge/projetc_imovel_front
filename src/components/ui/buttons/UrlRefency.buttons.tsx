'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function UrlReferencyButton() {
  const path = usePathname();

  let buttonLabel = "Entrar";
  let directTo = "/auth/entrar";

  if (path === "/auth/entrar") {
    buttonLabel = "Criar Conta";
    directTo = "/auth/registrar";
  } else if (path === "/auth/registrar" || path === "/criar-anuncio") {
    buttonLabel = "Meus Anúncios";
    directTo = "/meus-anuncios";
  }

  return (
    <Link
      href={directTo}
      className="group border-2 border-black w-fit h-full p-2.5 text-center justify-center cursor-pointer focus-within:border-black/20 focus-within:ring-[#FFFFFF] hover:border-[#FFFFFF] duration-300 transition-colors"
    >
      <span className="font-medium leading-6 text-black transition-colors group-hover:text-white">
        {buttonLabel}
      </span>
    </Link>
  );
}


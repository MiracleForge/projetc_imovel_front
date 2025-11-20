'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function UrlReferencyButton() {

  const path = usePathname();
  const buttonLabel = path === '/auth/entrar' ? "Criar Conta" : "Entrar";
  const directTo = path === '/auth/entrar' ? "/auth/register" : "/auth/entrar";

  return <Link href={directTo}
    className="group border-2 border-black w-fit h-full p-2.5 text-center justify-center cursor-pointer focus-within:border-black/20  focus-within:ring-[#BFBFBF]  hover:border-[#BFBFBF] /duration-300 transition-colors"
  >
    <span className="font-medium leading-6 group-hover:text-[#BFBFBF] transition-colors"> {buttonLabel}</span>
  </Link>

}


"use client"

import { signOut } from "next-auth/react"
import Image from "next/image"

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="w-full inline-flex space-x-3 px-4 py-1.5 text-base border border-[#8C8C8C] bg-white text-center hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-semibold"
    >
      <Image
        src="/miscellaneous/sair-icon.svg"
        width={18}
        height={18}
        unoptimized
        alt=""
      />
      <span>Desconectar</span>
    </button>
  )
}



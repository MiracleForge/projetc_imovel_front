"use client"
import { signOut } from "next-auth/react"
export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}   // <-- CORRETO
      className="hover:text-primary-blue underline underline-offset-1 font-medium mt-6 fixed bottom-6"
    >
      Sair
    </button>
  )
}



'use client';

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  pendingText?: string;
  type?: "button" | "submit"
}

export default function SubmitButton({ text = "Confirme", pendingText = "Aguarde...", type = "submit", ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type={type}
      className="w-full mt-2 h-12 font-medium hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center text-xl bg-black text-white px-4 py-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      {...props}
    >
      {pending ? pendingText : text}
    </button>
  );
}


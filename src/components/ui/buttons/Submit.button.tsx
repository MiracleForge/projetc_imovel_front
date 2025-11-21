'use client';

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text?: string;
  pendingText?: string;
  type?: "button" | "submit"
}

export default function SubmitButton({ text = "Confirme", pendingText = "Aguarde...", type = "submit" }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type={type}
      className="w-full mt-2 h-12 font-medium hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center text-xl bg-black text-white px-4 py-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
    >
      {pending ? pendingText : text}
    </button>
  );
}


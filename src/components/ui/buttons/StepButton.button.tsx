"use client";

import React from "react";
import clsx from "clsx";

interface StepButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function StepButton({
  children,
  variant = "secondary",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
}: StepButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "h-12 font-medium transition duration-300 inline-flex items-center justify-center text-xl px-6 py-2 rounded",
        disabled || loading
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer",

        variant === "secondary" &&
        (disabled || loading
          ? "bg-gray-200 text-gray-400"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:ring hover:ring-gray-400"),

        variant === "primary" &&
        (disabled || loading
          ? "bg-gray-400 text-white"
          : "bg-black text-white hover:bg-black hover:ring hover:ring-white")
      )}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}


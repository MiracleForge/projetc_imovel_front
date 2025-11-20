'use client'

import { InputHTMLAttributes } from "react"

interface CommumInputInterface extends InputHTMLAttributes<HTMLInputElement> {
  topLabel: string
};

export default function CommumInput({ topLabel, ...props }: CommumInputInterface) {

  return (
    <div className="group relative border focus-within:border-black/20 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-[#BFBFBF]">

      <div className="flex justify-between">
        <label aria-label={topLabel}
          className="text-sm text-muted-foreground group-focus-within:text-secundary-blue font-bold">
          {topLabel}
        </label>
      </div>

      <div className="relative flex justify-between items-center">

        <input
          className="
            peer block w-[88%] border-0 bg-transparent p-0 text-sm 
            placeholder:text-muted-foreground/90 
            focus:outline-none focus:ring-0
          "
          {...props}
        />

        {/* ÍCONE DE VÁLIDO */}
        <div
          className="
            absolute right-0 invisible 
            peer-[&:not(:focus):valid]:visible 
            peer-[&:not(:focus):valid]:text-green-800
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd" />
          </svg>
        </div>

        {/* ÍCONE DE INVÁLIDO */}
        <div
          className="
            absolute right-0 invisible 
            peer-[&:not(:placeholder-shown):not(:focus):invalid]:visible
            peer-[&:not(:placeholder-shown):not(:focus):invalid]:text-red-800
          "
        >
          <svg viewBox="0 0 54 54" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.7 57L0 51.3L22.8 28.5L0 5.7L5.7 0L28.5 22.8L51.3 0L57 5.7L34.2 28.5L57 51.3L51.3 57L28.5 34.2L5.7 57Z" />
          </svg>
        </div>

      </div>
    </div>
  )
}


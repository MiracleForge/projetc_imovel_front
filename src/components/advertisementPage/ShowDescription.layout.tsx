"use client"
import { useState } from "react"

export default function ShowDescription({ description }: { description: string }) {
  if (!description) return null

  const [open, setOpen] = useState(false)

  return (
    <div className="relative mt-4b w-full">

      <p
        className={`text-sm leading-relaxed whitespace-pre-wrap break-words transition-all duration-300
        ${!open ? "line-clamp-6 text-neutral-600" : "text-neutral-800"}
        w-full`}
      >
        {description}
      </p>

      {!open && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
      )}

      <button
        onClick={() => setOpen(prev => !prev)}
        className="mt-3 text-secundary-blue text-sm font-medium hover:underline"
      >
        {open ? "Ver menos" : "Ver descrição completa"}
      </button>
    </div>
  )
}


export default function StudioBadge({ text }: { text: string }) {

  return <div className="w-60 rotate-45 origin-top-right z-20">
    <div className="bg-linear-to-r from-secundary-blue via-terciary-blue to-secundary-blue
          border border-blue-700
          shadow-[0_4px_0_rgb(30,58,138)]
          rounded-xl
          transition-all duration-300 ease-out
          group-hover:-translate-y-[3px]
          active:translate-y-px
          before:absolute before:inset-0 
          before:bg-linear-to-r before:from-transparent before:via-white/30 before:to-transparent
          before:-skew-x-12
          before:translate-x-[-150%]
          before:transition-transform before:duration-700
          group-hover:before:translate-x-[150%]
          after:absolute after:inset-0 after:rounded-xl
          after:bg-blue-500/40 after:blur-sm after:opacity-0
          transition-all
          group-hover:after:opacity-100
          ring-1 ring-inset ring-white/10
          text-white text-sm font-bold py-2 text-center shadow-lg">
      {text}
    </div>
  </div>
}

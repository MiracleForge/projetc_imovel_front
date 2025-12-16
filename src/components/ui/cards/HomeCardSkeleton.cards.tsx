export default function CardSkeleton() {
  return (
    <article className="w-full max-w-[260px] shrink-0 lg:max-w-[280px] animate-pulse">
      <div className="flex flex-col gap-2 lg:gap-3">
        {/* Imagem */}
        <div className="relative overflow-hidden rounded-2xl bg-neutral-200 w-full h-[180px] lg:h-[200px] shadow-[4px_5px_5px_0px] shadow-shadow-blue/85" />

        {/* Badge */}

        {/* Informações do Imóvel */}
        <div className="flex flex-col gap-2 px-1">
          <div className="h-5 bg-neutral-200 rounded w-3/4" /> {/* título */}
          <div className="h-4 bg-neutral-200 rounded w-1/2 mt-1" /> {/* preço */}
          <div className="h-3 bg-neutral-200 rounded w-2/3 mt-1" /> {/* localização */}
        </div>

        {/* Footer */}
        <footer className="flex items-center gap-2 px-1 text-xs md:text-sm border-t border-neutral-terciary/10 pt-2">
          <div className="rounded-full bg-neutral-200 w-8 h-8" /> {/* avatar */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="h-3 bg-neutral-200 rounded w-2/3" /> {/* nome */}
            <div className="h-2 bg-neutral-200 rounded w-1/3" /> {/* função */}
          </div>
        </footer>
      </div>
    </article>
  )
}


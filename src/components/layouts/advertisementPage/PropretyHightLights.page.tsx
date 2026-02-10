export default function PropertyHighlights() {
  return (
    <section className="flex flex-row border-t border-t-foreground justify-around py-8">

      <Highlight
        title="Visitas flexíveis"
        description="Agende horários convenientes para conhecer o imóvel"
      />

      <Highlight
        title="Vendas Comprovadas"
        description="Informações conferidas pela plataforma"
      />

      <Highlight
        title="Usuário Imobily"
        description="Usuário Imobily com 2 anos"
      />

    </section>
  )
}

function Highlight({
  svgUrl,
  title,
  description,
  extra: string
}: {
  svgUrl?: string
  title: string
  description: string
  extra?: string
}) {
  return (
    <div className="flex gap-4">

      <div className="size-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
        <div className="size-3 rounded-full bg-gray-400" />
      </div>

      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

    </div>
  )
}


import Badge from "../../ui/tooltips/Badge.ui";

export default function SectionFeature() {
  return (
    <section
      className="space-component-to-component flex flex-col border-b pb-6"
      aria-labelledby="titulo-confira-tambem"
      role="region"
    >
      {/* Header */}
      <div className="max-w-3xl">
        <h2
          id="titulo-confira-tambem"
          className="text-2xl md:text-3xl font-bold text-gray-800"
        >
          Oportunidades que realmente fazem sentido para você
        </h2>
        <p className="mt-2 text-gray-500">
          Imóveis selecionados para morar melhor ou investir com mais segurança.
        </p>
      </div>

      {/* Feature cards */}
      <div className="md:flex mt-8 md:-mx-4" role="list">
        <FeatureImageCard
          badge="Pronto para morar"
          title="Apartamentos Decorados"
          description="Ambientes planejados nos mínimos detalhes para você se imaginar vivendo."
          backgroundUrl="/banners/features/apartamentos-decorados.png"
        />

        <FeatureImageCard
          badge="Alta valorização"
          title="Imóveis na Planta"
          description="Invista antes do lançamento e maximize seu potencial de retorno."
          backgroundUrl="/banners/features/compra-na-planta.png"
        />
      </div>

      {/* Banner Create Account */}
      <div
        className="relative mt-10 h-86 rounded-3xl overflow-hidden bg-center bg-cover"
        style={{
          backgroundImage:
            "url('/banners/features/frame-create-account-banner.png')",
        }}
        aria-labelledby="titulo-crie-conta"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-blue-700/30 via-blue-600/15 to-transparent" />


        <div className="relative z-10 flex items-center justify-end h-full">
          <div className="px-6 md:px-10 max-w-xl text-white">

            {/* Radios */}
            <input
              id="opt-comprador"
              type="radio"
              name="mode"
              className="peer/comprador hidden"
              defaultChecked
            />
            <input
              id="opt-vendedor"
              type="radio"
              name="mode"
              className="peer/vendedor hidden"
            />

            <Badge label="Gratuito • Leva menos de 1 minuto" />

            <h2
              id="titulo-crie-conta"
              className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight"
            >
              Crie sua conta
            </h2>

            <p className="mt-3 text-white/80">
              Uma experiência personalizada para comprar, vender ou investir melhor.
            </p>

            {/* comprador */}
            <p className="mt-4 hidden peer-checked/comprador:block">
              Receba alertas inteligentes, salve imóveis favoritos e descubra
              oportunidades que combinam com seu perfil.
            </p>

            {/* vendedor */}
            <p className="mt-4 hidden peer-checked/vendedor:block">
              Anuncie com destaque, alcance compradores qualificados e gerencie
              tudo em um só lugar.
            </p>

            {/* Selectors */}
            <div className="flex gap-3 mt-6">
              <label
                htmlFor="opt-comprador"
                className="
                  flex items-center gap-2 px-2 md:px-4 py-3 rounded-xl cursor-pointer
                  bg-secundary-blue backdrop-blur-md border border-white/20
                  hover:bg-white/30 transition-all
                  active:scale-[0.96]
                "
              >
                <img src="/miscellaneous/comprador-icon.svg" width={18} />
                <span className="font-bold uppercase text-xs md:text-sm">
                  Sou Comprador
                </span>
              </label>

              <label
                htmlFor="opt-vendedor"
                className="
                  flex items-center gap-2 px-2 md:px-4 py-3 rounded-xl cursor-pointer
                  bg-secundary-blue backdrop-blur-md border border-white/20
                  hover:bg-white/30 transition-all
                  active:scale-[0.96]
                "
              >
                <img src="/miscellaneous/vendedor-icon.svg" width={18} />
                <span className="font-bold uppercase text-xs md:text-sm">
                  Sou Vendedor
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------- */

interface FeatureImageCardProps {
  title: string;
  description: string;
  backgroundUrl: string;
  badge: string;
}

function FeatureImageCard({
  title,
  description,
  backgroundUrl,
  badge,
}: FeatureImageCardProps) {
  return (
    <article
      className="
        group relative w-full md:w-1/2 h-56 md:h-64 mt-8 md:mt-0 md:mx-4
        rounded-3xl overflow-hidden bg-cover bg-center
        before:absolute before:inset-0
        before:bg-gradient-to-t before:from-black/70 before:to-black/10
        before:transition-opacity before:duration-500
        group-hover:before:opacity-80
      "
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
    >
      <div className="relative z-10 flex items-center h-full">
        <div className="px-6 md:px-10 max-w-xl text-white">
          <Badge label={badge} />

          <h3 className="mt-2 text-xl md:text-2xl font-bold">
            {title}
          </h3>

          <p className="mt-2 text-white/90">
            {description}
          </p>

          <button
            className="mt-5 inline-flex items-center gap-2 font-semibold uppercase text-sm tracking-wide hover:underline"
            aria-label={`Visitar ${title}`}
          >
            Quero conhecer
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}


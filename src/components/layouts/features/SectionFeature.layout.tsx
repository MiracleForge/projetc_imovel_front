export default function SectionFeature() {
  return (
    <section
      className="space-component-to-component flex flex-col border-b pb-6"
      aria-labelledby="titulo-confira-tambem"
      role="region"
    >
      <h2
        id="titulo-confira-tambem"
        className="tipografy-title text-gray-600 text-2xl font-medium"
        itemProp="name"
      >
        Confira Também
      </h2>

      <div className="md:flex mt-8 md:-mx-4" role="list">
        <FeatureImageCard
          title="Apartamentos Decorados"
          description="Descubra ambientes planejados nos mínimos detalhes."
          backgroundUrl="/banners/features/apartamentos-decorados.png"
        />

        <FeatureImageCard
          title="Encontre Imóveis na Planta"
          description="Comprar na planta é investir com segurança e construir o espaço perfeito desde o início."
          backgroundUrl="/banners/features/compra-na-planta.png"
        />
      </div>

      <div
        className="mt-8 aspect-auto h-86 rounded-3xl overflow-hidden bg-center md:bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url('/banners/features/frame-create-account-banner.png')",
        }}
        role="region"
        aria-labelledby="titulo-crie-conta"
      >
        <div className="flex items-center justify-end h-full">
          <div className="px-6 md:px-10 max-w-xl" itemScope itemType="https://schema.org/RegisterAction">

            {/* Radios acessíveis */}
            <input
              id="opt-comprador"
              type="radio"
              name="mode"
              className="peer/comprador hidden"
              defaultChecked
              aria-label="Ver benefícios para compradores"
            />

            <input
              id="opt-vendedor"
              type="radio"
              name="mode"
              className="peer/vendedor hidden"
              aria-label="Ver benefícios para vendedores"
            />

            <h2
              id="titulo-crie-conta"
              className="text-2xl md:text-3xl text-text-blue font-stretch-semi-expanded"
              itemProp="name"
            >
              Crie sua Conta...
            </h2>

            <p className="mt-2 text-text-blue" itemProp="description">
              Junte-se aos milhares de compradores & vendedores
            </p>

            {/* comprador */}
            <p
              className="mt-2 text-text-blue hidden peer-checked/comprador:block"
              aria-live="polite"
              itemProp="description"
            >
              Encontre imóveis perfeitos para você com filtros inteligentes,
              tours virtuais e alertas sob medida.
            </p>

            {/* vendedor */}
            <p
              className="mt-2 text-text-blue hidden peer-checked/vendedor:block"
              aria-live="polite"
              itemProp="description"
            >
              Anuncie com destaque, gerencie propostas e alcance compradores
              qualificados com facilidade.
            </p>

            <div className="flex gap-3 mt-4" role="radiogroup" aria-label="Tipo de usuário">
              <label
                htmlFor="opt-comprador"
                className="inline-flex items-center px-2 md:px-3 py-2 text-xs md:text-sm uppercase font-bold rounded cursor-pointer bg-blue-600 text-white hover:bg-blue-500 transition peer-checked/comprador:bg-blue-800 peer-checked/comprador:scale-105"
              >
                Sou Comprador

                {/* Ícone inativo */}
                <svg
                  className="h-5 w-5 ml-2 peer-checked/comprador:hidden"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>

                {/* Ícone ativo */}
                <svg
                  className="h-5 w-5 ml-2 hidden peer-checked/comprador:block"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l9 9-9 9-9-9 9-9z"></path>
                </svg>
              </label>
              <label
                htmlFor="opt-vendedor"
                className="
                  inline-flex items-center px-2 md:px-3 py-2 text-xs md:text-sm uppercase font-bold rounded cursor-pointer
                  bg-blue-600 text-white hover:bg-blue-500 transition
                  peer-checked/vendedor:bg-blue-800 peer-checked/vendedor:scale-105
                "
                role="radio"
                aria-checked="false"
              >
                Sou Vendedor
                <svg
                  className="h-5 w-5 ml-2"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureImageCardProps {
  title: string;
  description: string;
  backgroundUrl: string;
}

function FeatureImageCard({ title, description, backgroundUrl }: FeatureImageCardProps) {
  return (
    <article
      className="
        relative w-full h-54 md:h-64 mt-8 md:mx-4 overflow-hidden bg-cover bg-center
        md:mt-0 md:w-1/2 rounded-2xl before:absolute before:inset-0
        before:bg-linear-to-t before:from-black/60 before:to-black/10 before:z-10 md:brightness-100
      "
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
      role="listitem"
      itemScope
      itemType="https://schema.org/CreativeWork"
      aria-label={title}
    >
      <meta itemProp="image" content={backgroundUrl} />

      <div className="relative z-20 flex items-center h-full">
        <div className="px-10 max-w-xl">
          <h3 className="text-xl lg:text-2xl text-white font-semibold" itemProp="headline">
            {title}
          </h3>

          <p className="mt-2 text-white" itemProp="description">
            {description}
          </p>

          <button
            className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none"
            aria-label={`Visitar página de ${title}`}
            itemProp="url"
          >
            <span>Visite agora</span>
            <svg
              className="h-5 w-5 mx-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}


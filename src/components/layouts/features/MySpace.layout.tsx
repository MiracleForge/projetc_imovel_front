import Image from "next/image";
import UserAvatar from "../../ui/avatars/UserAvatar.ui";
import Link from "next/link";

export default function MySpace() {
  const userData = null;

  return (
    <section className="space-component-to-component flex flex-col lg:flex-row items-center gap-5 md:gap-10">

      {/* TEXTO */}
      <div className="w-full lg:w-1/2">
        <div className="max-w-xl space-y-4">

          <span className="inline-block text-secundary-blue font-semibold text-sm tracking-wide uppercase">
            Meu Espaço Premium
          </span>

          <h2 className="tipografy-title leading-relaxed lg:leading-tight">
            Transforme seus anúncios em uma vitrine exclusiva
          </h2>

          <p className="text-neutral/80 leading-relaxed">
            Com o <strong>Meu Espaço</strong>, você cria seu próprio ambiente dentro da plataforma.
            Personalize cores, destaque seus imóveis, adicione identidade visual e transforme sua
            página em uma loja completa — profissional, moderna e totalmente sua.
          </p>

          {/* CTA PRINCIPAL */}
          <Link
            href=""
            className="inline-flex items-center px-6 py-3 rounded-full bg-terciary-blue text-white font-semibold shadow-md hover:shadow-lg transition-all w-fit"
            role="button"
          >
            Criar Meu Espaço
          </Link>

          {/* Testemunho */}
          <blockquote className="w-full mt-4 lg:mt-8 border-t lg:border-l-4 border-secundary-blue/50 pl-4 pt-4">
            <p className="text-gray-700 italic leading-relaxed">
              “Depois que personalizei meu espaço, meus anúncios tiveram muito mais engajamento.
              Ficou com a minha identidade e passou mais confiança aos compradores.”
            </p>

            <footer className="mt-4 flex items-center gap-3">
              <UserAvatar size={42} />
              <div>
                <p className="text-sm font-semibold text-neutral">Manoel José Magalhães</p>
                <p className="text-xs text-neutral-terciary">
                  {userData ? "Corretor" : "Anunciante"}
                </p>
              </div>
            </footer>
          </blockquote>

        </div>
      </div>

      <div className="w-full lg:w-1/2 relative mt-6">
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <Image
            src="/banners/features/meu-espaço.png"
            fill
            alt="Meu espaço"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}


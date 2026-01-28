import Image from "next/image";
import UserAvatar from "../../ui/avatars/UserAvatar.ui";
import Link from "next/link";
import CommumButton from "../../ui/buttons/CommumButton.ui";
import Badge from "../../ui/tooltips/Badge.ui";
import { StarIcon } from "../../ui/effects/ImobilyStudio.icon";

export default function MySpace() {
  return (
    <section className="space-component-to-component flex flex-col lg:flex-row items-center gap-8 md:gap-12">

      <div className="w-full lg:w-1/2">
        <div className="max-w-xl space-y-5">

          <Badge label="Imobily Studio" />

          <h2 className="tipografy-title leading-relaxed lg:leading-tight">
            Seu espaço exclusivo para vender, divulgar e criar audiência
          </h2>

          <p className="text-neutral/80 leading-relaxed">
            Crie uma página que parece um site profissional: banner personalizado,
            seus anúncios organizados em vitrine e seguidores recebendo novidades automaticamente.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <CommumButton className="inline-flex gap-3"
              label="Imobly Studios" url="#" variant="highlight" >
              <StarIcon />
            </CommumButton>

            <span className="text-xs text-neutral/60">Sem custo inicial no lançamento * <Link className="link-default" href={"#"}>Ver Condições especiais</Link></span>
          </div>

          {/* Depoimento */}
          <blockquote className="w-full mt-6 border-l-4 border-secundary-blue/50 pl-4">
            <p className="text-gray-700 italic leading-relaxed">
              “Depois que criei meu Imobily Studio, meus anúncios passaram a ter muito mais visibilidade.
              As pessoas seguem meu espaço e recebem meus lançamentos automaticamente.”
            </p>

            <footer className="mt-4 flex items-center gap-3">
              <UserAvatar size={42} />
              <div>
                <p className="text-sm font-semibold text-neutral">Manoel José Magalhães</p>
                <p className="text-xs text-neutral-terciary">Anunciante Premium</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>

      {/* VISUAL */}
      <div className="w-full lg:w-1/2 relative">
        <div className="group relative w-full h-[340px] md:h-[440px] lg:h-[540px] rounded-2xl overflow-hidden shadow-2xl bg-white">

          {/* barra fake de navegador */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-4 text-xs text-gray-500 truncate">imobily.com/studio/joao-silva</span>
          </div>

          {/* CONTEÚDO DA PÁGINA */}
          <div className="relative h-full bg-gray-50">

            {/* Banner */}
            <div className="relative h-40 md:h-48 w-full">
              <Image
                src="/banners/features/meu-espaço.png"
                fill
                alt="Banner do Imobily Studio"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-3 left-4 text-white">
                <p className="text-sm font-semibold">Studio João Silva</p>
                <p className="text-xs opacity-80">12 imóveis disponíveis</p>
              </div>
            </div>

            {/* FILA DE ANÚNCIOS */}
            <div className="mt-4 px-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-600">Últimos anúncios</p>
                <span className="text-[10px] text-gray-400">ordenados por relevância</span>
              </div>
              <div className="flex gap-3 overflow-hidden py-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="min-w-[130px] h-36 rounded-xl bg-white shadow-md overflow-hidden"
                  >
                    <div className="h-18 bg-gray-200" />
                    <div className="p-2 space-y-1">
                      <div className="h-2 w-3/4 bg-gray-300 rounded" />
                      <div className="h-2 w-1/2 bg-gray-200 rounded" />
                      <div className="h-2 w-1/3 bg-gray-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MÉTRICAS */}
            <div className="mt-4 px-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white shadow-sm px-3 py-2">
                <p className="text-[10px] text-gray-400 uppercase">Seguidores</p>
                <p className="text-sm font-bold text-gray-700">1.284</p>
              </div>
              <div className="rounded-xl bg-white shadow-sm px-3 py-2">
                <p className="text-[10px] text-gray-400 uppercase">Visualizações</p>
                <p className="text-sm font-bold text-gray-700">8.912</p>
              </div>
              <div className="rounded-xl bg-white shadow-sm px-3 py-2">
                <p className="text-[10px] text-gray-400 uppercase">Leads</p>
                <p className="text-sm font-bold text-gray-700">37</p>
              </div>
            </div>

            {/* NOTIFICAÇÕES */}
            <div className="absolute right-4 bottom-6 w-56 h-40 overflow-hidden pointer-events-none">
              <div className="relative h-full">

                <div
                  className="absolute bottom-0 w-full animate-notification"
                  style={{ animationDelay: "0s" }}
                >
                  <Notification text="Novo imóvel publicado" />
                </div>

                <div
                  className="absolute bottom-0 w-full animate-notification"
                  style={{ animationDelay: "2s" }}
                >
                  <Notification text="3 novos seguidores" />
                </div>

                <div
                  className="absolute bottom-0 w-full animate-notification"
                  style={{ animationDelay: "4s" }}
                >
                  <Notification text="Lead interessado em cobertura" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Notification({ text }: { text: string }) {
  return (
    <div className="mb-3 rounded-xl bg-white/95 backdrop-blur shadow-lg px-4 py-3 text-xs font-semibold text-gray-800">
      🔔 {text}
    </div>
  );
}


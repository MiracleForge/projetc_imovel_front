import Link from "next/link";
import { CompactHeader } from "@/src/components/layouts/headers/CompactHeader.header";

interface BaseLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  bgGradientFrom?: string;
  bgGradientTo?: string;
  cardClassName?: string;
}

export function CartedLayout({
  children,
  title = "Anuncie com a Imobily",
  subtitle = "",
  bgGradientFrom = "from-primary-blue",
  bgGradientTo = "to-secundary-blue",
  cardClassName = "",
}: BaseLayoutProps) {
  return (
    <section className="relative flex flex-col min-h-dvh w-full font-sans overflow-hidden bg-white text-black">
      <div
        className={`bg-linear-to-b ${bgGradientFrom} ${bgGradientTo}
        w-[125%] h-[60vh] -translate-y-40 -translate-x-12 -rotate-6
        absolute top-0 blur-[0.5px] transform-gpu`}
      />

      <CompactHeader />

      <div className="bg-white flex flex-col items-center pt-[1vh] sm:justify-center sm:pt-0">
        <div className="relative w-full max-w-xl mt-10 sm:mt-12">

          <div
            className={`
              mx-1 lg:mx-5 border text-center bg-gray-50 
              border-foreground/80 lg:p-8 shadow-[20px_0_20px_20px] shadow-slate-500/10
              ${cardClassName}
            `}
          >
            <div className="flex flex-col justify-center items-center p-6 font-normal space-y-3">
              <img src="/logos/imobly-logo.svg" width={36} height={36} />
              <h3 className="text-3xl tracking-tighter">{title}</h3>
              {subtitle && <p className="mt-1.5 text-sm">{subtitle}</p>}
            </div>

            <div className="px-6 py-3">
              {children}
            </div>

          </div>
        </div>
      </div>

      <footer className="flex justify-center gap-3 w-full p-6 text-sm">
        <Link href="#"><span className="link-default">Ajuda</span></Link>
        <Link href="#"><span className="link-default">Página inicial</span></Link>
        <Link href="/politicas-privacidade"><span className="link-default">Políticas</span></Link>
        <Link href="/termos-de-uso"><span className="link-default">Termos</span></Link>
      </footer>

    </section>
  );
}


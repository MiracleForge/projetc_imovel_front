import "../../../globals.css";
import Link from "next/link";
import { CompactHeader } from "@/src/components/layouts/headers/CompactHeader.header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return <section className="font-sans relative w-full text-black overflow-hidden min-h-dvh justify-between flex flex-col bg-white">

    <div className="bg-linear-to-b from-primary-blue to-secundary-blue w-[125%] h-[60vh] -translate-y-40 -translate-x-12 -rotate-6 absolute top-0 antialiased transform-gpu blur-[0.5px]
 bg-mobile-landscape" />

    <CompactHeader />

    <div className="bg-white flex flex-col items-center  pt-[1vh] sm:justify-center sm:pt-0">
      <div className="relative md:mt-12 w-full max-w-3xl sm:mt-10">
        <div
          className="mx-5 border text-center bg-gray-50 border-foreground/80  lg:p-8 shadow-[20px_0_20px_20px] shadow-slate-500/10">
          <div className="flex flex-col justify-center items-center p-6 font-normal space-y-3">

            <img src="/logos/imobly-logo.svg" width={36} height={36} />
            <h3 className="text-2xl leading-6 tracking-tighter">Publique na Imobly</h3>
            <p className="mt-1.5 text-sm"> Faça parte da maior comunidade de anúncios.</p>
          </div>

          {children}

        </div>
      </div>
    </div>

    <footer className="flex flex-row justify-center space-x-3 w-full p-6 text-sm">
      <Link href={"#"}>
        <span className="link-default link-default">Ajuda</span>
      </Link>
      <Link href={"/"}>
        <span className="link-default link-default">Página inicial</span>
      </Link>
      <Link href={"politicas-privacidade"}>
        <span className="link-default link-default">Politicas</span>
      </Link>
      <Link href={"/termos-de-uso"}>
        <span className="link-default link-default">Termos</span>
      </Link>
    </footer>
  </section>
}

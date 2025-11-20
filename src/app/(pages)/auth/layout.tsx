import "../../globals.css";
import Image from "next/image";
import Link from "next/link";
import UrlReferencyButton from "@/src/components/ui/buttons/UrlRefency.buttons";
import CommumInput from "@/src/components/ui/imputs/Commum.inputs";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return <section className="relative w-full text-black overflow-hidden min-h-screen justify-between flex flex-col ">

    <div className="bg-linear-to-b from-primary-blue to-secundary-blue w-[125%] h-[60vh] -translate-y-40 -translate-x-12 -rotate-6 absolute top-0 antialiased transform-gpu blur-[0.5px]" />
    <header className="flex flex-row justify-between p-6 z-9999 relative">
      <Image
        className=""
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />

      <UrlReferencyButton />
    </header>


    <div className="bg-white flex flex-col items-center  pt-[1vh] sm:justify-center sm:pt-0">

      <div className="relative md:mt-12 w-full max-w-xl sm:mt-10">
        <div
          className="mx-5 border text-center bg-gray-50 border-[#BFBFBF]/80  lg:p-8 shadow-[20px_0_20px_20px] shadow-slate-500/10">
          <div className="flex flex-col p-6 font-normal">
            <h3 className="text-3xl leading-6 tracking-tighter">Entre em OLX2</h3>
            <p className="mt-1.5 text-sm"> Faça parte da maior comunidade de anúncios.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form className="gap-px">
              {children}
              <CommumInput topLabel="Email" autoComplete="on" type="email" name="email" placeholder="exemplo@email.com" required />
              <CommumInput topLabel="Senha" autoComplete="off" type="password" name="password" required />
              <div className="mt-4 flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="remember"
                    className="outline-none focus:outline focus:outline-sky-300" />
                  <span className="text-sm font-normal">Continuar conectado</span>
                </label>
                <a className="text-[10px] font-extralight underline leading-6 text-[#707070]" href="/forgot-password">Esqueceu sua senha?</a>
              </div>

              <button
                className="w-full mt-2 h-12 font-medium hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white px-4 py-2"
                type="submit">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>


    <footer className="flex flex-row justify-center space-x-4 w-full p-6 text-sm font-medium leading-6">
      <Link href={"#"}>
        <span>Ajuda</span>
      </Link>
      <Link href={"#"}>
        <span>Página inicial</span>
      </Link>
      <Link href={"#"}>
        <span>Politicas</span>
      </Link>
      <Link href={"#"}>
        <span>Termos de Uso</span>
      </Link>
    </footer>
  </section>
}

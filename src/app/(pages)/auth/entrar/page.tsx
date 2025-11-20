import CommumInput from "@/src/components/ui/imputs/Commum.inputs";

export default function Page() {
  return <form className="gap-px">
    <CommumInput topLabel="Email" autoComplete="on" type="email" name="email" placeholder="exemplo@email.com" required />
    <CommumInput topLabel="Senha" autoComplete="off" type="password" name="password" placeholder="" required />

    <div className="mt-5 flex items-center justify-between">
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" name="remember"
          className="outline-none focus:outline focus:outline-sky-300" />
        <span className="text-sm font-normal">Continuar conectado</span>
      </label>
      <a className="text-[10px] font-extralight link-default" href="/forgot-password">Esqueceu sua senha?</a>
    </div>

    <button
      className="w-full mt-2 h-12 font-medium hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white px-4 py-2 cursor-pointer"
      type="submit">Entrar</button>
  </form>
}

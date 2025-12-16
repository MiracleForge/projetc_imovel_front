import ToHomeButton from "../../ui/buttons/ToHomeButton.ui";

export default function Footer() {
  return (
    <footer className="px-3 pt-8 lg:px-12 w-full bg-secundary-blue text-white overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 pb-10">
        <div className="md:max-w-96">
          <ToHomeButton logoType="full" size={160} />
          <p className="mt-6 text-sm">
            Seu próximo lar — ou a oportunidade que você sempre esperou — está mais perto do que imagina.
            Fale diretamente com vendedores pelo chat ou conecte-se com corretores confiáveis para fechar negócio com segurança.
          </p>
        </div>
        <div className="flex-1 flex items-start justify-between md:justify-end">
          <div>
            <h2 className="font-semibold mb-5 text-lg">Imobily</h2>
            <ul className="text-sm space-y-2 font-normal">
              <li><a href="#">Página Inicial</a></li>
              <li><a href="#">Sobre nós</a></li>
              <li><a href="#">Entre em contato</a></li>
              <li><a href="#">Politicas de Privacidade</a></li>
              <li><a href="#">Denunciar</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-lg">Get in touch</h2>
            <div className="text-sm space-y-2 font-normal">
              <p>+1-234-567-890</p>
              <p>contact@example.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 px-3 text-center text-sm pb-5 bg-black -mx-6 lg:-mx-12 font-semibold">
        Copyright {new Date().getFullYear()} © <a rel="noopener noreffer" href="https://sonnensoftware.com.br">Sonnen Software</a>. Todos os direitos reservados
      </p>
    </footer>
  )
}

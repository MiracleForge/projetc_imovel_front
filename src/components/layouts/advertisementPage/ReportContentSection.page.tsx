export default function ReportContentSection() {
  return (
    <div className="border bg-white rounded-lg shadow flex flex-col justify-between p-6 space-y-4">
      <div className="space-y-2">
        <p className="text-lg font-semibold text-gray-800">Dicas de Segurança:</p>
        <p className="text-sm text-gray-600">
          Para garantir uma negociação segura, nunca realize pagamentos antecipados. O portal facilita a conexão entre as partes, mas não se responsabiliza pelas transações.
        </p>
      </div>

      <div className="space-y-2">
        <a
          href="/informacoes-de-seguranca"
          className="text-sm text-blue-600 hover:underline flex items-center space-x-2"
        >
          <span>Saiba mais sobre segurança nas transações</span>
        </a>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">Desconfie de ofertas muito abaixo do preço do mercado. Isso pode ser um sinal de fraude.</p>
      </div>

      <div className="space-y-2">
        <a
          href="/contato-seguro"
          className="text-sm text-blue-600 hover:underline flex items-center space-x-2"
        >
          <span>Entrar em contato com segurança</span>
        </a>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">Mantenha sempre o respeito e a ética em todas as negociações.</p>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-green-500 font-semibold">Anúncio Verificado</span>
      </div>

      <button
        className="border-t border-gray-300 mt-4 py-2 flex items-center justify-center text-red-600 hover:bg-red-50 transition-colors rounded-md"
      >
        <span className="font-semibold">Reportar este anúncio</span>
      </button>
    </div>
  )

}



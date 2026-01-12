import { pricingPlans } from "@/src/data/pricing.data";
import StepField from "../../wrappers/StepField.wrapper";
import { HelperText } from "../../ui/separatores/FormSeparator.ui";
import Badge from "../../ui/tooltips/Badge.ui";

interface SummaryData {
  category: string;
  title: string;
  location: string;
  transaction: string;
  price: string;
  promotion: string | null;
}

export default function PreviewAdvertiserSection({
  summary,
  onEditPlan,
}: {
  summary: SummaryData;
  onEditPlan: () => void;
}) {
  const plan = pricingPlans.find((p) => p.variant === summary.promotion);
  const hasNoPlan = summary.promotion === null;

  const getPlanDisplayName = () => {
    if (!plan) return "Escolher Plano";
    return plan.title.replace("PLANO ", "");
  };

  const priceCleaned = summary.price.replace(/[^\d.,]/g, "").replace(",", ".");

  const formattedPrice = Number(priceCleaned).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });


  return (
    <StepField aria-labelledby="summary-title pt-4 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3
          id="summary-title"
          className="text-xl font-bold text-gray-900 flex items-center gap-2"
        >
          <img src="/logos/imobly-logo.svg" className="w-6 h-6 shrink-0" alt="Imobly" />
          <span className="truncate">Revise seu Anúncio</span>
        </h3>
      </div>

      <div className="mb-6 pb-6 border-b-2 border-gray-200">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
          Título que aparecerá no site
        </p>
        <h4 className="text-xl font-bold text-gray-900 mb-3 capitalize leading-tight break-words hyphens-auto">
          {summary.title || "Título do anúncio"}
        </h4>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5 min-w-0">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{summary.location}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
          <span className="capitalize truncate">{summary.category}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
          <span className="capitalize truncate">{summary.transaction}</span>
        </div>
      </div>

      {/* Grid de Informações */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 mb-8">
        <SummaryItem
          label="Preço do Imóvel"
          value={formattedPrice}
          highlighted
        />
        <SummaryItem
          label="Categoria"
          value={summary.category}
        />
        <SummaryItem
          label="Tipo de Transação"
          value={summary.transaction}
        />
        <SummaryItem
          label="Localização"
          value={summary.location}
        />
      </div>

      {/* Seção do Plano */}
      <h4 className="mt-6 text-start font-semibold text-base underline underline-offset-8">
        Detalhes do Plano
      </h4>

      <div className="mt-4 px-4 py-6 rounded-lg transition-all bg-linear-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        {/* Plano Selecionado */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-base font-semibold text-[#1F3C8F] shrink-0">
              Plano
            </span>
            {hasNoPlan && (
              <Badge label="Obrigatório" />
            )}
          </div>

          <button
            onClick={onEditPlan}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all shrink-0 ${hasNoPlan
              ? "bg-terciary-blue hover:bg-secundary-blue text-white shadow-md hover:shadow-lg"
              : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
              }`}
            aria-label={
              hasNoPlan ? "Escolher plano" : "Editar plano selecionado"
            }
          >
            <img
              src="/miscellaneous/edit-icon.svg"
              alt=""
              className="w-4 h-4 shrink-0"
            />
            <span className="whitespace-nowrap">
              {hasNoPlan ? "Escolher Plano" : getPlanDisplayName()}
            </span>
          </button>
        </div>

        {/* Informação do Plano Atual */}
        {!hasNoPlan && plan && (
          <div className="mt-3 pt-3 border-t border-blue-200">
            <div className="flex items-center justify-between text-sm gap-4">
              <span className="text-gray-600">Investimento</span>
              <span className="font-semibold text-[#1F3C8F] whitespace-nowrap">
                {Number(plan.price.replace(/[^\d.,]/g, "").replace(",", ".")).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}

              </span>
            </div>
          </div>
        )}

        {/* Mensagem de Ajuda */}
        {hasNoPlan && (
          <div className="mt-3 pt-3 border-t border-blue-200">
            <HelperText text="💡 Selecione um plano para publicar seu anúncio" />
          </div>
        )}
      </div>
    </StepField>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1 min-w-0">
      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
        {label}
      </p>
      <p className={`font-semibold break-words capitalize text-base text-gray-900'`}>
        {value || "Não informado"}
      </p>
    </div>
  );
}

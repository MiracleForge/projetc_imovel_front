import { pricingPlans } from "@/src/data/pricing.data";
import StepField from "../../wrappers/StepField.wrapper";

interface SummaryData {
  category: string;
  title: string;
  location: string;
  transaction: string;
  price: string;
  promotion: string;
}

export default function PreviewAdvertiserSection({
  summary,
  onEditPlan,
}: {
  summary: SummaryData;
  onEditPlan: () => void;
}) {
  const plan = pricingPlans.find(
    (plan) => plan.variant === summary.promotion
  );

  return (
    <StepField aria-labelledby="summary-title  pt-4 border-t border-gray-200">

      <h3
        id="summary-title"
        className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 underline underline-offset-8"
      >
        <img src="/logos/imobly-logo.svg" className="w-5 h-5" alt="Imobly" />
        Detalhes do Anúncio
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <SummaryItem label="Categoria" value={summary.category} />
        <SummaryItem label="Título do anúncio" value={summary.title} />
        <SummaryItem label="Localização" value={summary.location} />
        <SummaryItem label="Tipo de Transação" value={summary.transaction} />
      </div>


      <h4 className="text-start font-semibold text-base underline underline-offset-8">Detalhes do Plano</h4>
      <div className="mt-4 px-4 py-8 bg-blue-100 rounded-lg text-center font-semibold">
        <div className="text-base font-semibold text-[#1F3C8F] flex items-center justify-between">
          <p className="">Preço estimado</p>
          <p className="text-sm text-[#6E6E6A] font-normal">{plan?.price}</p>
        </div>
        <div className="text-base font-semibold text-[#1F3C8F] flex items-center justify-between">
          <span>Plano</span>

          <div className="flex items-center gap-2">
            <button
              onClick={onEditPlan}
              className="flex items-center space-x-3 cursor-pointer"
              aria-label="Mais informações sobre o plano">
              <img src={"/miscellaneous/edit-icon.svg"} alt="" className="w-4 h-4" />
              <span className="capitalize text-black">{summary.promotion}</span>
            </button>

          </div>
        </div>
      </div>
    </StepField>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5 capitalize">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-lg break-words whitespace-normal">
        {value || "Não informado"}
      </p>
    </div>
  )
}

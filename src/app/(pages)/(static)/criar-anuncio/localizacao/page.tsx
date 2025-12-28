import { LocationStep } from "@/src/components/criar-anuncio/LocationStep";
import { Form } from "@/src/components/criar-anuncio/Form";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";

export default function LocalizacaoPage() {
  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={6} currentStep={2} />

      <Form
        currentStep={2}
        totalSteps={6}
        nextRoute="/criar-anuncio/detalhes"
        prevRoute="/criar-anuncio/informacoes"
      >
        <LocationStep />
      </Form>
    </div>
  );
}

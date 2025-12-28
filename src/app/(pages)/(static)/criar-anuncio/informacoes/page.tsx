import { InformationStep } from "@/src/components/criar-anuncio/InformationStep";
import { Form } from "@/src/components/criar-anuncio/Form";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";

export default function InformacoesPage() {
  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={6} currentStep={1} />

      <Form
        currentStep={1}
        totalSteps={6}
        nextRoute="/criar-anuncio/localizacao"
        prevRoute="/criar-anuncio/categoria"
      >
        <InformationStep />
      </Form>
    </div>
  );
}

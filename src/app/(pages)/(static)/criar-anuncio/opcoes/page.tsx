import { Form } from "@/src/components/criar-anuncio/Form";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";
import { OptionsStep } from "@/src/components/criar-anuncio/OptionsStep";

export default function OpcoesPage() {
  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={7} currentStep={5} />

      <Form
        currentStep={5}
        totalSteps={7}
        nextRoute="/criar-anuncio/revisao"
        prevRoute="/criar-anuncio/caracteristicas"
      >
        <OptionsStep />
      </Form>
    </div>
  );
}

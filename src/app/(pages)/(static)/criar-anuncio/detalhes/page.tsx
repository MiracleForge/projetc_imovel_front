import { DetailsStep } from "@/src/components/criar-anuncio/DetailsStep";
import { Form } from "@/src/components/criar-anuncio/Form";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";

export default function DetalhesPage() {
  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={6} currentStep={3} />

      <Form
        currentStep={3}
        totalSteps={6}
        nextRoute="/criar-anuncio/caracteristicas"
        prevRoute="/criar-anuncio/localizacao"
      >
        <DetailsStep />
      </Form>
    </div>
  );
}

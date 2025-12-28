import { CharacteristicsStep } from "@/src/components/criar-anuncio/CharacteristicsStep";
import { Form } from "@/src/components/criar-anuncio/Form";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";

export default function CaracteristicasPage() {
  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={6} currentStep={4} />

      <Form
        currentStep={4}
        totalSteps={6}
        nextRoute="/criar-anuncio/revisao"
        prevRoute="/criar-anuncio/detalhes"
      >
        <CharacteristicsStep />
      </Form>
    </div>
  );
}

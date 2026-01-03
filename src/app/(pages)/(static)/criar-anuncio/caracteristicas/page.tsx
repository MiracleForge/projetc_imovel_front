import { CharacteristicsStep } from "@/src/components/criar-anuncio/CharacteristicsStep";
import { Form } from "@/src/components/criar-anuncio/Form";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";

export default function CaracteristicasPage() {
  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={7} currentStep={4} />

      <Form
        currentStep={4}
        totalSteps={7}
        nextRoute="/criar-anuncio/opcoes"
        prevRoute="/criar-anuncio/detalhes"
      >
        <CharacteristicsStep />
      </Form>
    </div>
  );
}

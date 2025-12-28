import { CategoryStep } from "@/src/components/criar-anuncio/CategoryStep";
import { Form } from "@/src/components/criar-anuncio/Form";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";

export default function CategoriaPage() {
  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={6} currentStep={0} />

      <Form
        currentStep={0}
        totalSteps={6}
        nextRoute="/criar-anuncio/informacoes"
      >
        <CategoryStep />
      </Form>
    </div>
  );
}

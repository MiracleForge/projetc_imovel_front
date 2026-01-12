import { Form } from "@/src/components/criar-anuncio/Form"; import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";
import { ReviewStep } from "@/src/components/criar-anuncio/ReviewStep";
import { createAdversetimentAction } from "@/src/app/actions/adversetiment.actions";

export default function RevisaoPage() {
  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={7} currentStep={6} />

      <Form
        currentStep={6}
        totalSteps={7}
        prevRoute="/criar-anuncio/opcoes"
        label="Revise seu Anúncio"
        submitAction={createAdversetimentAction}

      >
        <ReviewStep />
      </Form> </div>
  );
}

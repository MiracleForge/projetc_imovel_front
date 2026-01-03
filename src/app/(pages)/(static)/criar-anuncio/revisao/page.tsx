import { SubmitPage } from "./SubmitPage";
import { createAdversetimentAction } from "@/src/app/actions/adversetiment.actions";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";

export default function RevisaoPage() {
  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={7} currentStep={6} />
      <SubmitPage submitAction={createAdversetimentAction} />
    </div>
  );
}

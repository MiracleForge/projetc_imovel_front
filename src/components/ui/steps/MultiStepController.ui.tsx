import SubmitButton from "../buttons/StepButton.button";

interface StepNavigationProps {
  step: number;
  lastStep: boolean;
  disabled?: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export function StepNavigation({ step, lastStep, disabled, onNext, onPrev }: StepNavigationProps) {
  return (
    <div className={`flex justify-between pt-3 ${step !== 0 || lastStep ? "space-x-3" : ""}`}>
      {step > 0 ? (
        <SubmitButton disabled={disabled} text="Voltar" type="button" onClick={onPrev} />
      ) : (
        <span />
      )}

      {!lastStep ? (
        <SubmitButton disabled={disabled} text="Avançar" type="button" onClick={onNext} />
      ) : null}

      {lastStep && <SubmitButton disabled={disabled} text="Cadastrar" type="submit" />}
    </div>
  );
}

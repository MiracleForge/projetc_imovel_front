import { ChangeEvent } from "react";

interface UseFormInputProps {
  updateField: (name: string, value: any) => void;
  customRules?: (name: string, value: any) => boolean;
}

export function useFormInput({ updateField, customRules }: UseFormInputProps) {

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let finalValue: any = value;

    // Narrowing seguro → checkbox existe apenas em <input>
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      finalValue = e.target.checked;
    }

    if (customRules && customRules(name, finalValue)) {
      return;
    }

    updateField(name, finalValue);
  };

  return { handleInputChange };
}


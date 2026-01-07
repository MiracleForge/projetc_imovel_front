"use client"

import { useState, FocusEvent } from "react";
import { cepServerSchema } from "@/src/contracts/DTOs/advertisement/cep.validation";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";

export function useCepLookup() {
  const { updateField } = useAdvertisementFormStore();
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [lastCep, setLastCep] = useState("");

  const handleCepBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const rawCep = e.target.value.replace(/\D/g, "");
    if (!rawCep || rawCep === lastCep) return;

    const cepValidation = cepServerSchema.safeParse(rawCep);
    if (!cepValidation.success) {
      alert(cepValidation.error.issues[0].message);
      return;
    }

    try {
      setIsLoadingCep(true);

      const res = await fetch(`/api/public/localization/cep?cep=${cepValidation.data}`);
      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result?.error || "Erro ao buscar CEP");
        return;
      }

      const { cep, uf, localidade, bairro, logradouro } = result.data;
      updateField("address", {
        cep,
        state: uf,
        city: localidade,
        neighbourhood: bairro,
        street: logradouro,
      });
    } catch (err) {
      console.error("Erro ao buscar CEP:", err);
      alert("Erro ao buscar o endereço pelo CEP");
    } finally {
      setLastCep(rawCep);
      setIsLoadingCep(false);
    }
  };

  return { isLoadingCep, handleCepBlur };
}

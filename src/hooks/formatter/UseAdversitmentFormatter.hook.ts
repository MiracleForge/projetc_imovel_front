import { adversetimentCreateDTO } from "@/src/contracts/DTOs/advertisement/advertisement.create.dto";
import { useMemo } from "react";

interface SummaryData {
  category: string;
  title: string;
  location: string;
  transaction: string;
  price: string;
  promotion: string;
}


export function useAdvertiserSummary(formData: adversetimentCreateDTO): SummaryData {
  return useMemo(() => ({
    category: formData.category ?? "",
    title: formData.title ?? "",
    location:
      formData.address?.city && formData.address?.state
        ? `${formData.address.city}, ${formData.address.state}`
        : "",
    transaction: formData.transactionMode ?? "",
    promotion: formData.promotion,
    price: formData.price ? `R$ ${formData.price}` : "Não informado",
  }), [formData]);
}


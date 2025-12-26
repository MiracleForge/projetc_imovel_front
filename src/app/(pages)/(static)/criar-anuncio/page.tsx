"use client";

import { useState, useCallback, useMemo, Activity } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";
import CommumInput from "@/src/components/ui/inputs/Commum.inputs";
import { adversetimentCategoriesData, transactionMode } from "@/src/data/global.constants";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";
import { adversetimentCreateDTO } from "@/src/contracts/DTOs/advertisement/advertisement.create.dto";
import { actionResponse, initialState } from "@/src/contracts/types/responses.core";
import { createAdversetimentAction } from "@/src/app/actions/adversetiment.actions";
import { StepNavigation } from "@/src/components/ui/steps/MultiStepController.ui";
import FileInput from "@/src/components/ui/inputs/FileInputs.ui";
import CheckMarkCategorys from "@/src/components/ui/inputs/CheckmarksCategorys.ui";
import { adversetimentCategoryDTO, adversetizeCategorySchema } from "@/src/contracts/DTOs/advertisement/advertisement.entity.dto";

type FormDataType = adversetimentCreateDTO;
type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const selectBase =
  "border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 hover:bg-gray-100 duration-150";

const pretty = (s: string) =>
  s.replace(/-/g, " ").replace(/^./, c => c.toUpperCase());

const Step = ({ visible, children }: { visible: boolean; children: React.ReactNode }) => (
  <Activity mode={visible ? "visible" : "hidden"}>{children}</Activity>
);

const FormField = ({ label, srOnly, children }: { label: string; srOnly?: boolean; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <label className={srOnly ? "sr-only" : "text-lg font-semibold text-gray-800 tracking-tight"}>{label}</label>
    {children}
  </div>
);
export default function Page() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  // valida e transforma a URL em CategoryType | null
  const categoryFromUrl: adversetimentCategoryDTO | null = urlCategory && adversetizeCategorySchema.safeParse(urlCategory).success
    ? (urlCategory as adversetimentCategoryDTO)
    : null;
  const defaultFormData: FormDataType = {
    category: categoryFromUrl,
    title: "",
    subTitle: "",
    description: "",
    price: 0,
    transactionMode: "",
    phone: "",
    whatsapp: "",
    imagesFiles: [],
    address: { state: "", city: "", neighbourhood: "", street: "", number: "", cep: "" },
  };


  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormDataType>(defaultFormData);
  const [state, formAction, pending] = useActionState(createAdversetimentAction, initialState);
  const router = useRouter();

  const totalSteps = 4;
  const lastStep = useMemo(() => step === totalSteps - 1, [step]);

  const nextStep = useCallback(() => setStep(prev => Math.min(prev + 1, totalSteps - 1)), []);
  const prevStep = useCallback(() => setStep(prev => Math.max(prev - 1, 0)), []);

  const handleInputChange = ({ target }: InputChangeEvent) => {
    const { name, value } = target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormDataType] as object),
          [child]: value,
        },
      }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    router.push(`?category=${value}`);
  };

  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={totalSteps} currentStep={step} />

      <form action={formAction} className="gap-px space-y-3">
        <FirstStep step={step} formData={formData} handleInputChange={handleInputChange} />
        <SecondStep step={step} formData={formData} handleInputChange={handleInputChange} />
        <ThirdStep step={step} formData={formData} handleInputChange={handleInputChange} />
        <FourthStep step={step} formData={formData} setFormData={setFormData} state={state} />

        <StepNavigation step={step} lastStep={lastStep} onNext={nextStep} onPrev={prevStep} disabled={pending || formData.phone === " "} />
      </form>
    </div>
  );
}


function FirstStep({
  step,
  formData,
  handleInputChange,
}: {
  step: number;
  formData: FormDataType;
  handleInputChange: (e: InputChangeEvent) => void;
}) {
  return (
    <Step visible={step === 0}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Informações Básicas</h2>

      <CommumInput
        topLabel="Título"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Título do seu anúncio"
        required
      />

      <CommumInput
        topLabel="Subtítulo do anúncio"
        type="text"
        name="subTitle"
        value={formData.subTitle}
        onChange={handleInputChange}
        placeholder="Digite um subtítulo atrativo"
        required
      />

      <FormField label="Categoria do anúncio" srOnly>
        <ul
          role="listbox"
          aria-label="Categorias do anúncio"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 py-3 w-full"
        >
          {adversetimentCategoriesData.map((cat) => (
            <CheckMarkCategorys
              key={cat}
              id={`category-${cat}`}
              name="category"
              categoryName={cat}
              value={cat}
              isCheckedValue={cat === formData.category}
              onChange={handleInputChange}
            />
          ))}
        </ul>
      </FormField>

      <FormField label="Descrição">
        <textarea
          name="description"
          placeholder="Descreva seu anúncio em detalhes"
          rows={4}
          className={selectBase}
          onChange={handleInputChange}
        />
      </FormField>
    </Step>
  );
}


function SecondStep({
  step,
  formData,
  handleInputChange,
}: {
  step: number;
  formData: FormDataType;
  handleInputChange: (e: InputChangeEvent) => void;
}) {
  const addressFields = [
    ["state", "Estado"],
    ["city", "Cidade"],
    ["neighbourhood", "Bairro"],
    ["street", "Rua"],
    ["number", "Número"],
    ["cep", "CEP"],
  ] as const;

  return (
    <Step visible={step === 1}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Localização</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addressFields.slice(0, 2).map(([field, label]) => (
          <CommumInput
            key={field}
            topLabel={label}
            type="text"
            name={`address.${field}`}
            value={formData.address?.[field]}
            onChange={handleInputChange}
          />
        ))}
      </div>

      {addressFields.slice(2, 4).map(([field, label]) => (
        <CommumInput
          key={field}
          topLabel={label}
          type="text"
          name={`address.${field}`}
          value={formData.address?.[field]}
          onChange={handleInputChange}
        />
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addressFields.slice(4).map(([field, label]) => (
          <CommumInput
            key={field}
            topLabel={label}
            type="text"
            name={`address.${field}`}
            value={formData.address?.[field]}
            onChange={handleInputChange}
          />
        ))}
      </div>
    </Step>
  );
}


function ThirdStep({
  step,
  formData,
  handleInputChange,
}: {
  step: number;
  formData: FormDataType;
  handleInputChange: (e: InputChangeEvent) => void;
}) {
  return (
    <Step visible={step === 2}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalhes da Transação</h2>

      <FormField label="Tipo de Transação" srOnly>
        <select
          name="transactionMode"
          value={formData.transactionMode}
          onChange={handleInputChange}
          required
          className={selectBase}
        >
          <option value="">Selecione...</option>
          {transactionMode.map(m => (
            <option key={m} value={m}>
              {pretty(m)}
            </option>
          ))}
        </select>
      </FormField>

      <CommumInput
        topLabel="Preço (R$)"
        type="number"
        name="price"
        placeholder="1000.00"
        required
        value={formData.price}
        onChange={handleInputChange}
      />

      <CommumInput
        topLabel="Telefone de Contato"
        type="tel"
        name="phone"
        placeholder="(11) 98765-4321"
        value={formData.phone}
        onChange={handleInputChange}
      />

      <CommumInput
        topLabel="WhatsApp"
        type="tel"
        name="whatsapp"
        placeholder="(11) 98765-4321"
        value={formData.whatsapp}
        onChange={handleInputChange}
      />
    </Step>
  );
}


function FourthStep({
  step,
  formData,
  setFormData,
  state
}: {
  step: number;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  state: actionResponse
}) {
  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);

    setFormData(prev => ({
      ...prev,
      imagesFiles: [...(prev.imagesFiles || []), ...newFiles],
    }));
  };


  const summary = useMemo(
    () => ({
      category: formData.category ?? "",
      title: formData.title ?? "",
      location:
        formData.address?.city && formData.address?.state
          ? `${formData.address.city}, ${formData.address.state}`
          : "",
      transaction: formData.transactionMode ?? "",
      price: formData.price ? `R$ ${formData.price}` : "Não informado",
    }),
    [formData]
  );

  const SummaryItem = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-0.5">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value || "Não informado"}</p>
    </div>
  );

  return (
    <Step visible={step === 3}>
      <div className="mt-6 p-5 rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-white shadow-sm">

        <FileInput onChange={handleFileChange} label="Imagens do anuncio" />

        {formData.imagesFiles && (
          <ul className="mt-3 space-y-1">
            {formData.imagesFiles.map((file, i) => (
              <li key={i} className="text-sm text-gray-600">
                📄 {file.name}
              </li>
            ))}
          </ul>
        )}

        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <img src="/logos/imobly-logo.svg" className="w-5 h-5" alt="Logo" />
          Resumo do Imóvel
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <SummaryItem label="Categoria" value={summary.category} />
          <SummaryItem label="Título do anúncio" value={summary.title} />
          <SummaryItem label="Localização" value={summary.location} />
          <SummaryItem label="Tipo de Transação" value={summary.transaction} />
        </div>

        <div className="mt-4 p-3 bg-blue-100 rounded-lg text-center">
          <p className="text-xs text-blue-700">Preço estimado</p>
          <p className="text-xl font-bold text-blue-900">{summary.price}</p>
        </div>

        {state.error && (
          <ul className="text-red-500 text-sm pt-0.5 list-disc list-inside">
            {state.message?.split("\n").map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}


      </div>
    </Step>

  );
}

"use client";

import { useState, useCallback, useMemo, Activity } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";
import CommumInput from "@/src/components/ui/inputs/Commum.inputs";
import CheckMarkCategorys from "@/src/components/ui/inputs/CheckmarksCategorys.ui";
import FileInput from "@/src/components/ui/inputs/FileInputs.ui";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";
import { StepNavigation } from "@/src/components/ui/steps/MultiStepController.ui";
import { adversetimentCategoriesData, transactionMode } from "@/src/data/global.constants";
import { adversetimentCreateDTO } from "@/src/contracts/DTOs/advertisement/advertisement.create.dto";
import { adversetimentCategoryDTO, adversetizeCategorySchema } from "@/src/contracts/DTOs/advertisement/advertisement.entity.dto";
import { actionResponse, initialState } from "@/src/contracts/types/responses.core";
import { createAdversetimentAction } from "@/src/app/actions/adversetiment.actions";


type FormDataType = adversetimentCreateDTO;
type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

interface SummaryData {
  category: string;
  title: string;
  location: string;
  transaction: string;
  price: string;
}


const SELECT_BASE = "border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 hover:bg-gray-100 duration-150";

const ADDRESS_FIELDS = [
  ["state", "Estado"],
  ["city", "Cidade"],
  ["neighbourhood", "Bairro"],
  ["street", "Rua"],
  ["number", "Número"],
  ["cep", "CEP"],
] as const;


const pretty = (s: string) => s.replace(/-/g, " ").replace(/^./, c => c.toUpperCase());

const getDefaultFormData = (category: adversetimentCategoryDTO | null): FormDataType => ({
  category,
  title: "",
  subTitle: "",
  description: "",
  price: 0,
  transactionMode: "",
  phone: "",
  whatsapp: "",
  imagesFiles: [],
  address: {
    state: "",
    city: "",
    neighbourhood: "",
    street: "",
    number: "",
    cep: ""
  },
});



export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const categoryFromUrl = validateCategoryFromUrl(urlCategory);

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormDataType>(() => getDefaultFormData(categoryFromUrl));
  const [state, formAction, pending] = useActionState(createAdversetimentAction, initialState);

  const totalSteps = 4;
  const lastStep = useMemo(() => step === totalSteps - 1, [step]);

  const nextStep = useCallback(() => {
    setStep(prev => Math.min(prev + 1, totalSteps - 1));
  }, []);

  const prevStep = useCallback(() => {
    setStep(prev => Math.max(prev - 1, 0));
  }, []);

  const handleInputChange = useCallback(({ target }: InputChangeEvent) => {
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

    if (name === "category") {
      router.push(`?category=${value}`);
    }
  }, [router]);

  const isFormDisabled = pending || formData.phone === " ";

  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={totalSteps} currentStep={step} />

      <form action={formAction} className="gap-px space-y-3">
        <FirstStep
          step={step}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <SecondStep
          step={step}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <ThirdStep
          step={step}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <FourthStep
          step={step}
          formData={formData}
          setFormData={setFormData}
          state={state}
        />

        <StepNavigation
          step={step}
          lastStep={lastStep}
          onNext={nextStep}
          onPrev={prevStep}
          disabled={isFormDisabled}
        />
      </form>
    </div>
  );
}


const validateCategoryFromUrl = (urlCategory: string | null): adversetimentCategoryDTO | null => {
  if (!urlCategory) return null;
  const validation = adversetizeCategorySchema.safeParse(urlCategory);
  return validation.success ? (urlCategory as adversetimentCategoryDTO) : null;
};


const FormField = ({
  label,
  srOnly,
  children
}: {
  label: string;
  srOnly?: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <label className={srOnly ? "sr-only" : "text-lg font-semibold text-gray-800 tracking-tight"}>
      {label}
    </label>
    {children}
  </div>
);

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value || "Não informado"}</p>
  </div>
);

const SummaryCard = ({ summary }: { summary: SummaryData }) => (
  <>
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
  </>
);


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
    <Activity mode={step === 0 ? "visible" : "hidden"}>
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
          className={SELECT_BASE}
          onChange={handleInputChange}
        />
      </FormField>
    </Activity>
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
  return (
    <Activity mode={step === 1 ? "visible" : "hidden"}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Localização</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ADDRESS_FIELDS.slice(0, 2).map(([field, label]) => (
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

      {ADDRESS_FIELDS.slice(2, 4).map(([field, label]) => (
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
        {ADDRESS_FIELDS.slice(4).map(([field, label]) => (
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
    </Activity>
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
    <Activity mode={step === 2 ? "visible" : "hidden"}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalhes da Transação</h2>

      <FormField label="Tipo de Transação" srOnly>
        <select
          name="transactionMode"
          value={formData.transactionMode}
          onChange={handleInputChange}
          required
          className={SELECT_BASE}
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
    </Activity>
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
  state: actionResponse;
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

  return (
    <Activity mode={step === 3 ? "visible" : "hidden"}>
      <div className="mt-6 p-5 rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-white shadow-sm">
        <FileInput onChange={handleFileChange} label="Imagens do anuncio" />

        {formData.imagesFiles && formData.imagesFiles.length > 0 && (
          <ul className="mt-3 space-y-1">
            {formData.imagesFiles.map((file, i) => (
              <li key={i} className="text-sm text-gray-600">
                📄 {file.name}
              </li>
            ))}
          </ul>
        )}

        <SummaryCard summary={summary} />

        {state.error && (
          <ul className="text-red-500 text-sm pt-0.5 list-disc list-inside">
            {state.message?.split("\n").map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}
      </div>
    </Activity>
  );
}

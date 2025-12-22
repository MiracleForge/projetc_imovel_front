"use client";

import { useState, useCallback, useMemo, Activity } from "react";
import CommumInput from "@/src/components/ui/inputs/Commum.inputs";
import { adversetimentCategoriesData, transactionMode } from "@/src/data/global.constants";
import { StepNavigation } from "../../auth/registrar/page";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";
import { adversetimentCreateDTO } from "@/src/contracts/DTOs/advertisement/advertisement.create.dto";
import { initialState } from "@/src/contracts/types/responses.core";
import { useActionState } from "react";
import { createAdversetimentAction } from "@/src/app/actions/adversetiment.actions";

type FormDataType = Partial<Omit<adversetimentCreateDTO, "imagesURL">> & {
  images: File[]
};

export default function Page() {
  const [step, setStep] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    category: "apartamentos",
    title: "",
    subTitle: "",
    description: "",
    price: 0,
    transactionMode: "",
    phone: "",
    whatsapp: "",
    images: [],
    address: {
      state: "",
      city: "",
      neighbourhood: "",
      street: "",
      number: "",
      cep: "",
    },
  });

  const [state, formAction, pending] = useActionState(createAdversetimentAction, initialState)

  const totalSteps = 4;
  const lastStep = useMemo(() => step === totalSteps - 1, [step]);

  const nextStep = useCallback(() => setStep(prev => Math.min(prev + 1, totalSteps - 1)), []);
  const prevStep = useCallback(() => setStep(prev => Math.max(prev - 1, 0)), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent as keyof FormDataType], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setFormData(prev => ({ ...prev, images: files }));
  };


  return (
    <div className="max-w-3xl mx-auto p-6">
      <MultiStepIndicator totalSteps={totalSteps} currentStep={step} />

      <form action={formAction}
        method="POST"
        encType="multipart/form-data"
        className="flex flex-col gap-4 text-start animate-in fade-in duration-300">

        {/* Step 1: Informações Básicas */}
        <Activity mode={step === 0 ? "visible" : "hidden"}>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Informações Básicas</h2>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-800 tracking-tight">Categoria do anúncio</label>
              <select
                name="category"
                required
                className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 hover:bg-gray-100 duration-150"
              >
                <option value="">Selecione...</option>
                {adversetimentCategoriesData.map(cat => (
                  <option key={cat} value={cat}>{cat.replace(/-/g, " ").replace(/^./, c => c.toUpperCase())}</option>
                ))}
              </select>
            </div>

            <CommumInput topLabel="Título" type="text" name="title" placeholder="Título do seu anúncio" required />
            <CommumInput topLabel="Subtítulo do anúncio" type="text" name="subTitle" placeholder="Digite um subtítulo atrativo" required />

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-800 tracking-tight">Descrição</label>
              <textarea
                name="description"
                placeholder="Descreva seu anúncio em detalhes"
                rows={4}
                className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 hover:bg-gray-100 duration-150"
              />
            </div>
          </div>
        </Activity>

        {/* Step 2: Localização */}
        <Activity mode={step === 1 ? "visible" : "hidden"} >
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Localização</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CommumInput topLabel="Estado" type="text" name="address.state" value={formData.address?.state} onChange={handleInputChange} />
              <CommumInput topLabel="Cidade" type="text" name="address.city" value={formData.address?.city} onChange={handleInputChange} />
            </div>
            <CommumInput topLabel="Bairro" type="text" name="address.neighbourhood" value={formData.address?.neighbourhood} onChange={handleInputChange} />
            <CommumInput topLabel="Rua" type="text" name="address.street" value={formData.address?.street} onChange={handleInputChange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CommumInput topLabel="Número" type="text" name="address.number" value={formData.address?.number} onChange={handleInputChange} />
              <CommumInput topLabel="CEP" type="text" name="address.cep" value={formData.address?.cep} onChange={handleInputChange} />
            </div>
          </div>
        </Activity>

        {/* Step 3: Detalhes da Transação */}
        <div className={`${step === 2 ? "block" : "hidden"}`} >
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Detalhes da Transação</h2>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-800 tracking-tight">Tipo de Transação</label>
              <select name="transactionMode" value={formData.transactionMode} onChange={handleInputChange} required className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 hover:bg-gray-100 duration-150">
                <option value="">Selecione...</option>
                {transactionMode.map(m => <option key={m} value={m}>{m.replace(/-/g, " ").replace(/^./, c => c.toUpperCase())}</option>)}
              </select>
            </div>

            <CommumInput topLabel="Preço (R$)" type="number" name="price" placeholder="1000.00" required value={formData.price} onChange={handleInputChange} />
            <CommumInput topLabel="Telefone de Contato" type="tel" name="phone" placeholder="(11) 98765-4321" value={formData.phone} onChange={handleInputChange} />
            <CommumInput topLabel="WhatsApp" type="tel" name="whatsapp" placeholder="(11) 98765-4321" value={formData.whatsapp} onChange={handleInputChange} />
          </div>
        </div>

        {/* Step 4: Upload de Imagens */}
        <div className={`${step === 3 ? "block" : "hidden"}`} >
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Imagens do Anúncio</h2>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-800 tracking-tight">Faça upload das imagens</label>
              <input type="file" name="images" accept=".png,.jpg,.jpeg,.webp" multiple onChange={handleFileChange} className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
              <p className="text-sm text-gray-500">Formatos aceitos: PNG, JPEG, WEBP</p>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold text-gray-700 mb-2">Arquivos selecionados:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {selectedFiles.map((file, idx) => <li key={idx}>{file.name}</li>)}
                </ul>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-2">Resumo do Anúncio</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Categoria:</strong> {formData.category || "Não informado"}</p>
                <p><strong>Título:</strong> {formData.title || "Não informado"}</p>
                <p><strong>Localização:</strong> {formData.address?.city && formData.address.state ? `${formData.address.city}, ${formData.address.state}` : "Não informado"}</p>
                <p><strong>Preço:</strong> {formData.price ? `R$ ${formData.price}` : "Não informado"}</p>
                <p><strong>Tipo:</strong> {formData.transactionMode || "Não informado"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center ">
          <button type="button" className="bg-gray-600 text-sm text-white px-4 py-2 rounded-xl shadow-md hover:bg-gray-700 transition-all duration-200 font-semibold tracking-tight">Regras do Anúncio</button>
          <StepNavigation step={step} lastStep={lastStep} totalSteps={totalSteps} onNext={nextStep} onPrev={prevStep} disabled={pending} />
        </div>
      </form>
    </div>
  );
}


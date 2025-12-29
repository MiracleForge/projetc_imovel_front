"use client";

import { useMemo } from "react";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";

interface SummaryData {
  category: string;
  title: string;
  location: string;
  transaction: string;
  price: string;
}

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

export function ReviewStep() {
  const { formData, updateField } = useAdvertisementFormStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const currentFiles = formData.imagesFiles || [];

    updateField("imagesFiles", [...currentFiles, ...newFiles]);

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const currentFiles = formData.imagesFiles || [];
    const newFiles = currentFiles.filter((_, i) => i !== index);
    updateField("imagesFiles", newFiles);
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
    [formData],
  );

  return (
    <div className="mt-6 p-5 rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-white shadow-sm space-y-6">
      {/* File Input */}
      <div>
        <label className="flex flex-col items-center justify-center gap-2 w-full p-5 bg-white border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>

          <span className="text-neutral-700 font-medium">
            Adicionar Imagens
          </span>
          <span className="text-xs text-neutral-500">
            Clique para selecionar uma ou mais imagens
          </span>

          <input
            type="file"
            name="imagesFiles"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {formData.imagesFiles && formData.imagesFiles.length > 0 && (
          <p className="mt-2 text-sm text-gray-600 text-center">
            {formData.imagesFiles.length}{" "}
            {formData.imagesFiles.length === 1
              ? "imagem selecionada"
              : "imagens selecionadas"}
          </p>
        )}
      </div>

      {/* Image Preview Grid */}
      {formData.imagesFiles && formData.imagesFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {formData.imagesFiles.map((file, index) => (
            <ImagePreview
              key={`${file.name}-${index}`}
              file={file}
              index={index}
              onRemove={removeImage}
            />
          ))}
        </div>
      )}

      {/* Summary Card */}
      <div className="pt-4 border-t border-gray-200">
        <SummaryCard summary={summary} />
      </div>
    </div>
  );
}

function ImagePreview({
  file,
  index,
  onRemove,
}: {
  file: File;
  index: number;
  onRemove: (index: number) => void;
}) {
  const imageUrl = useMemo(() => {
    if (file instanceof File && file.size > 0) {
      try {
        return URL.createObjectURL(file);
      } catch (error) {
        console.error("Erro ao criar URL do arquivo:", error);
        return null;
      }
    }
    return null;
  }, [file]);

  return (
    <div className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={file.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Arquivo inválido</span>
        </div>
      )}

      {/* Overlay with remove button */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transform hover:scale-110"
          title="Remover imagem"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* File name tooltip */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition-opacity">
        {file.name}
      </div>
    </div>
  );
}

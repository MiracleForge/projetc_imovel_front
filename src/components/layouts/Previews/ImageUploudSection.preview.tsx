"use client";

import FileInput from "../../ui/inputs/FileInputs.ui";
import ImagePreview from "./InputFile.preview";

interface ImageUploadSectionProps {
  files: File[];
  onChange: (files: File[]) => void;
}

export default function ImageUploadSection({
  files,
  onChange
}: ImageUploadSectionProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (!selectedFiles.length) return;

    onChange([...files, ...selectedFiles]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <section className="space-y-4">
      <FileInput
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        text={{
          label: "Adicionar imagens",
          tip: "Clique para selecionar uma ou mais imagens"
        }}
      />

      {files.length > 0 && (
        <p className="text-sm text-gray-600 text-center" aria-live="polite">
          {files.length}{" "}
          {files.length === 1 ? "imagem selecionada" : "imagens selecionadas"}
        </p>
      )}

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <ImagePreview
              key={`${file.name}-${index}`}
              file={file}
              index={index}
              onRemove={removeImage}
            />
          ))}
        </div>
      )}
    </section>
  );
}


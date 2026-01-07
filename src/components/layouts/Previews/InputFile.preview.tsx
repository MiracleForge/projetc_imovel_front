"use client";

import { useEffect, useMemo } from "react";

interface ImagePreviewProps {
  file: File;
  index: number;
  onRemove: (index: number) => void;
}

export default function ImagePreview({
  file,
  index,
  onRemove
}: ImagePreviewProps) {
  const imageUrl = useMemo(() => {
    return file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : null;
  }, [file]);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <div className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Imagem ${index + 1}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Arquivo inválido</span>
        </div>
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
        <button
          type="button"
          aria-label="Remover imagem"
          onClick={() => onRemove(index)}
          className="
    opacity-0 group-hover:opacity-100 transition
    flex items-center justify-center
    w-8 h-8
    bg-red-500 hover:bg-red-600
    text-white
    rounded-full
  "
        >
          <span className="text-sm leading-none">✕</span>
        </button>

      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition">
        {file.name}
      </div>
    </div>
  );
}


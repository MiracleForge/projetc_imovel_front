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

  // Formata o tamanho do arquivo
  const fileSize = useMemo(() => {
    const sizeInMB = file.size / (1024 * 1024);
    return sizeInMB < 1
      ? `${(file.size / 1024).toFixed(0)} KB`
      : `${sizeInMB.toFixed(1)} MB`;
  }, [file.size]);

  return (
    <div className="relative group aspect-square rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm hover:shadow-lg transition-all hover:border-blue-300">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Imagem ${index + 1}`}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
          <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs text-gray-500 text-center">Arquivo inválido</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
        <button
          type="button"
          aria-label={`Remover imagem ${index + 1}`}
          onClick={() => onRemove(index)}
          className="
            pointer-events-auto
            transform scale-75 group-hover:scale-100 transition-transform
            flex items-center justify-center
            w-10 h-10
            bg-red-500 hover:bg-red-600
            text-white
            rounded-full
            shadow-lg hover:shadow-xl
            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
          "
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
        {index + 1}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <p className="text-xs font-medium truncate mb-0.5">
          {file.name}
        </p>
        <p className="text-xs text-gray-300">
          {fileSize}
        </p>
      </div>
    </div>
  );
}

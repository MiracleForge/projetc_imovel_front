"use client"
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";

interface AdvertisementPreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvertisementPreviewPanel({
  isOpen,
  onClose,
}: AdvertisementPreviewPanelProps) {
  const { formData } = useAdvertisementFormStore()
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-99999"
      role="presentation"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        className="absolute right-0 top-0 h-full w-[80%] bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <h2 id="preview-title" className="text-lg font-semibold">
            Preview do anúncio
          </h2>

          <button
            onClick={onClose}
            aria-label="Fechar preview"
          >
            ✕
          </button>
        </header>

        <div className="p-4 overflow-y-auto">
          {formData.category}
        </div>
      </aside>
    </div>
  );
}


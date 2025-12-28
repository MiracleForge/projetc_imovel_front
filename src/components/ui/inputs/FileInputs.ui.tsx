interface FileInputProps {
  label?: string;
  onChange: (files: FileList | null) => void;
}

export default function FileInput({
  label = "Selecione as imagens",
  onChange,
}: FileInputProps) {
  return (
    <label className="flex flex-col items-center justify-center gap-2 w-full p-5 bg-white border border-neutral-200 rounded-xl shadow-sm cursor-pointer hover:bg-neutral-50 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16l5-5 4 4 8-8"
        />
      </svg>

      <span className="text-neutral-700 text-sm">{label}</span>

      <input
        type="file"
        name="imagesFiles"
        id="imagesFiles"
        accept="image/*"
        multiple
        onChange={(e) => onChange(e.target.files)}
        className="hidden"
      />
    </label>
  );
}

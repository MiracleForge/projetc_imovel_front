import { InputHTMLAttributes } from "react";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  text: {
    label: string;
    tip: string;
  };
}

export default function FileInput({ text, ...props }: FileInputProps) {
  const tipId = "file-input-tip";

  return (
    <label
      className="flex flex-col items-center justify-center gap-2 w-full p-5 bg-white border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>

      <span className="text-neutral-700 font-medium">
        {text.label}
      </span>

      <span id={tipId} className="text-xs text-neutral-500">
        {text.tip}
      </span>

      <input
        className="hidden"
        aria-describedby={tipId}
        {...props}
      />
    </label>
  );
}


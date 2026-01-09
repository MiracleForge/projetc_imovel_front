import { InputHTMLAttributes } from "react";

interface CheckMarkMetricProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  iconKey: string,
  iconsMap: Record<string, string>;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowNegatives?: boolean
}

export function InputNumeric({
  id,
  label,
  iconKey,
  iconsMap,
  name,
  value,
  onChange,
  allowNegatives = true,
  ...rest
}: CheckMarkMetricProps) {
  const iconSrc = iconsMap[iconKey] ?? iconsMap["default"];

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!allowNegatives) return;
    const numeric = Number(e.target.value);

    if (numeric < 0) {
      e.target.value = "0";
      onChange({
        ...e,
        target: { ...e.target, value: "0", name }
      });
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (!allowNegatives) return;
    const numeric = Number(e.currentTarget.value);

    if (numeric < 0) {
      e.currentTarget.value = "0";
    }
  };

  return (
    <label
      htmlFor={id}
      className={` 
        flex items-center gap-4 w-full p-4 border border-foreground rounded-lg cursor-pointer 
        transition-all duration-300 bg-[#F3F5FF]
        hover:bg-blue-50 hover:border-secundary-blue
      `}
    >

      <div className="flex items-center gap-3">
        <img
          src={iconSrc}
          alt={label}
          className="w-8 h-8 object-contain"
        />

        <span className="text-sm font-medium capitalize">
          {label} {rest.required && <span className="text-red-500">*</span >}

        </span>
      </div>

      <input
        id={id}
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        onInput={handleInput}
        onBlur={handleBlur}
        className="ml-auto w-[40%] p-2 border border-foreground rounded-md 
          focus:ring-2 focus:ring-secundary-blue focus:border-secundary-blue outline-none"
        {...rest}
      />
    </label>
  );
}


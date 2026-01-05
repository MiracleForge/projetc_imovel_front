import { SelectHTMLAttributes } from "react"

interface CommumAddressInterface extends SelectHTMLAttributes<HTMLSelectElement> {
  topLabel: string;
  optionLabel: string;

  options: { value: string; label: string; }[]
}

export default function AdressInput({ topLabel, optionLabel, options, ...props }: CommumAddressInterface) {

  return (
    <div className={`group relative border border-neutral-300 focus-within:border-black px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-black/20"`}>
      <div className={`flex justify-between `}>
        <label aria-label={topLabel}
          className="text-sm text-muted-foreground group-focus-within:text-secundary-blue font-bold">
          {topLabel}
        </label>
      </div>
      <div className={"relative flex items-center justify-between"}>
        <select
          className={`w-full peer block border-0 bg-transparent text-sm 
            placeholder:text-muted-foreground/90 
            focus:outline-none focus:ring-0`}
          {...props}>
          <option value="">{optionLabel}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}> {opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}


import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

interface CustomCurrencyInputProps extends CurrencyInputProps { topLabel: string }

export default function CustomCurrencyInput({ topLabel, ...props }: CustomCurrencyInputProps) {
  return (
    <div
      className="
        group relative
        border border-neutral-300
        focus-within:border-black
        px-3 pb-1.5 pt-2.5
        duration-200
        focus-within:ring
        focus-within:ring-black/20
      "
    >

      <div className={`flex justify-between `}>
        <label aria-label={topLabel}
          className="text-sm text-muted-foreground group-focus-within:text-secundary-blue font-bold">
          {topLabel} {props.required && <span className="text-red-500">*</span >}
        </label>
      </div>
      <div className="relative flex items-center justify-between">

        <CurrencyInput
          className="w-[88%] peer block border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 capitalize"
          placeholder="R$ 0,00"
          decimalsLimit={2}
          fixedDecimalLength={2}
          intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
          inputMode="numeric"

          {...props}
        />
        <div
          className="
              absolute right-0 invisible
              peer-[&:not(:focus):valid]:visible
              peer-[&:not(:focus):valid]:text-green-800
            "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div
          className="
              absolute right-0 invisible
              peer-[&:not(:placeholder-shown):not(:focus):invalid]:visible
              peer-[&:not(:placeholder-shown):not(:focus):invalid]:text-red-800
            "
        >
          <svg
            className="w-7 h-7"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="scale(0.6857)"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.5 35C27.1652 35 35 27.1652 35 17.5C35 7.83475 27.1652 0 17.5 0C7.83475 0 0 7.83475 0 17.5C0 27.1652 7.83475 35 17.5 35ZM24.6155 10.3845C24.8613 10.6306 24.9993 10.9642 24.9993 11.312C24.9993 11.6598 24.8613 11.9934 24.6155 12.2395L19.355 17.5L24.6138 22.7587C24.8456 23.0076 24.9718 23.3366 24.9658 23.6767C24.9598 24.0167 24.8221 24.3411 24.5816 24.5816C24.3411 24.8221 24.0167 24.9598 23.6767 24.9658C23.3366 24.9718 23.0076 24.8456 22.7587 24.6138L17.5 19.3585L12.2413 24.6172Z"
              fill="#FF2A2A"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}


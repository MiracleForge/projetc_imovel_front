import { InputHTMLAttributes } from "react"

interface CommumInputInterface extends InputHTMLAttributes<HTMLInputElement> {
  topLabel: string
};

export default function CommumInput({ topLabel, ...props }: CommumInputInterface) {
  const isCheckbox = props.type === "checkbox";

  return (
    <div className={`group relative ${!isCheckbox && "border border-neutral-300 focus-within:border-black px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-black/20"}`}>

      {!isCheckbox && (
        <div className={`flex justify-between `}>
          <label aria-label={topLabel}
            className="text-sm text-muted-foreground group-focus-within:text-secundary-blue font-bold">
            {topLabel} {props.required && <span className="text-red-500">*</span >}
          </label>
        </div>
      )}

      <div className={`relative flex items-center ${isCheckbox ? "justify-start space-x-3" : "justify-between"}`}>

        <input
          className={` 
            ${!isCheckbox && "w-[88%]"} peer block border-0 bg-transparent p-0 text-sm 
            placeholder:text-muted-foreground/90 
            focus:outline-none focus:ring-0
            `}
          {...props}
        />

        {isCheckbox && (
          <div className={`flex justify-between whitespace-nowrap`}>
            <label aria-label={topLabel}
              className="text-sm text-muted-foreground group-focus-within:text-secundary-blue font-bold gap-x-3">
              {topLabel} {props.required && <span className="text-red-500">*</span >}
            </label>
          </div>
        )}

        {/* ÍCONE DE VÁLIDO */}
        {props.type !== "date" || isCheckbox && (
          <>
            <div
              className="
            absolute right-0 invisible 
            peer-[&:not(:focus):valid]:visible 
            peer-[&:not(:focus):valid]:text-green-800
          "
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd" />
              </svg>
            </div>

            <div
              className="
            absolute right-0 invisible 
            peer-[&:not(:placeholder-shown):not(:focus):invalid]:visible
            peer-[&:not(:placeholder-shown):not(:focus):invalid]:text-red-800
          "
            >
              <svg className="w-7 h-7" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" transform="scale(0.6857)">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.5 35C27.1652 35 35 27.1652 35 17.5C35 7.83475 27.1652 0 17.5 0C7.83475 0 0 7.83475 0 17.5C0 27.1652 7.83475 35 17.5 35ZM24.6155 10.3845C24.8613 10.6306 24.9993 10.9642 24.9993 11.312C24.9993 11.6598 24.8613 11.9934 24.6155 12.2395L19.355 17.5L24.6138 22.7587C24.8456 23.0076 24.9718 23.3366 24.9658 23.6767C24.9598 24.0167 24.8221 24.3411 24.5816 24.5816C24.3411 24.8221 24.0167 24.9598 23.6767 24.9658C23.3366 24.9718 23.0076 24.8456 22.7587 24.6138L17.5 19.3585L12.2413 24.6172C12.1211 24.7462 11.9762 24.8496 11.8152 24.9214C11.6542 24.9931 11.4804 25.0317 11.3042 25.0348C11.1279 25.0379 10.9529 25.0055 10.7895 24.9395C10.626 24.8735 10.4776 24.7752 10.3529 24.6506C10.2283 24.5259 10.13 24.3775 10.064 24.214C9.99802 24.0506 9.9656 23.8756 9.96871 23.6993C9.97182 23.5231 10.0104 23.3493 10.0821 23.1883C10.1539 23.0273 10.2573 22.8824 10.3862 22.7623L15.6415 17.5L10.3845 12.2413C10.2555 12.1211 10.1521 11.9762 10.0804 11.8152C10.0086 11.6542 9.97007 11.4804 9.96696 11.3042C9.96385 11.1279 9.99627 10.9529 10.0623 10.7895C10.1283 10.626 10.2266 10.4776 10.3512 10.3529C10.4758 10.2283 10.6243 10.13 10.7877 10.064C10.9511 9.99802 11.1262 9.9656 11.3024 9.96871C11.4786 9.97182 11.6524 10.0104 11.8134 10.0821C11.9744 10.1539 12.1193 10.2573 12.2395 10.3862L17.5 15.6415L22.7587 10.3827C23.0048 10.137 23.3384 9.9989 23.6862 9.9989C24.0341 9.9989 24.3677 10.137 24.6138 10.3827" fill="#FF2A2A" />
              </svg>
            </div>
          </>
        )}

      </div>
    </div>
  )
}


import { InputHTMLAttributes } from "react";

interface CheckmarkCategoryProps extends InputHTMLAttributes<HTMLInputElement> {
  categoryName: string;
  description?: string;
  isCheckedValue: boolean;
  iconKey: string,
  iconsMap?: Record<string, string>;
  type: "radio" | "checkbox";
}

export default function CheckMarkCategorys({ categoryName, description, isCheckedValue, id, value, type, iconKey, iconsMap, ...props }: CheckmarkCategoryProps) {
  const iconSrc = iconsMap ? iconsMap[iconKey] ?? iconsMap["default"] : ` /icons/${decodeURI(categoryName)}-categoria.svg`;

  return (
    <label className={` 
      flex items-center gap-4 w-full p-4 border border-foreground rounded-lg cursor-pointer transition-all duration-300
      hover:bg-blue-50 hover:border-secundary-blue bg-[#F3F5FF] ${isCheckedValue ? "border-secundary-blue" : ""}
    `}>
      <input
        type={type}
        id={id}
        name={props.name}
        value={categoryName} checked={isCheckedValue}
        className="peer absolute opacity-0 w-0 h-0"
        {...props}
      />
      <div className="flex items-center gap-3 peer-checked:text-secundary-blue">
        <img
          src={iconSrc}

          alt={categoryName}
          className="w-8 h-8 object-contain"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium capitalize">
            {categoryName.replace(/-/g, ' ')}
          </span>
          {description && <span className="text-xs">{description}</span>}
        </div>
      </div>

      <div className="ml-auto w-5 h-5 border border-foreground rounded-full peer-checked:border-blue-600 peer-checked:bg-blue-100 transition-all duration-300 shrink-0"></div>
    </label>
  );
}


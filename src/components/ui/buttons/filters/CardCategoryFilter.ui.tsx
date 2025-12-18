import { HomeCardsType } from "@/src/contracts/types/cards/responses.type";
import { useMemo, useState } from "react";

type Props = {
  itemsArray: HomeCardsType[];
  onFilter?: (items: HomeCardsType[]) => void;
};

export default function CardCategoryFilter({ itemsArray, onFilter }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  if (!itemsArray?.length) return null;

  const topCategories = useMemo(() => {
    const count = itemsArray.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, [itemsArray]);

  function handleFilter(category: string) {
    const isToggleOff = activeCategory === category;

    setActiveCategory(isToggleOff ? null : category);
    onFilter?.(
      isToggleOff
        ? itemsArray
        : itemsArray.filter(item => item.category === category)
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar text-neutral-terciary">
      {topCategories.map(([category]) => (
        <FiltersButton
          key={category}
          category={category}
          isActive={activeCategory === category}
          onClick={() => handleFilter(category)}
        />
      ))}
    </div>
  );
}


type ButtonProps = {
  category: string;
  isActive: boolean;
  onClick: () => void;
};

function FiltersButton({ category, isActive, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
    inline-flex items-center capitalize gap-1 lg:gap-2 rounded-full border border-[#E0E3EB] px-2 py-2 text-xs md:text-sm font-medium transition-all cursor-pointer
    ${isActive ? "text-terciary-blue bg-[#BDD9FF] active:scale-[0.97]" : "text-neutral-terciary hover:text-terciary-blue hover:bg-[#BDD9FF] hover:border-white "}`}
    >
      <img
        src={`/icons/${category}-categoria.svg`}
        alt={category}
        className="size-3 lg:size-4 logo-img"
      />
      <span className={`${isActive ? "max-w-none w-fit" : "max-w-[7ch] truncate "} md:max-w-none  whitespace-nowrap`}>
        {category.replace(/-/g, " ")}
      </span>
      {isActive && (
        <svg
          className="w-3 h-3 ml-1 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>)}
    </button>

  );
}


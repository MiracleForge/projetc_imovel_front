import Image from "next/image";
import Link from "next/link";


import { categoryData } from "@/src/data/categoryButtonData.data"

export default function CategoryNav() {
  return (
    <nav aria-label="Categorias" className="w-full">

      <ul className="flex px-1 space-x-3 flex-nowrap  overflow-x-auto scroll-smooth no-scrollbar">
        {categoryData.map((btn, index) => (
          <li key={index} className="shrink-0">
            <CategoryButton
              label={btn.name}
              url={btn.url}
              iconPath={btn.icon}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}

interface CategoryButtonProps {
  label: string;
  iconPath: string;
  url: string;
}

function CategoryButton({ label, url, iconPath }: CategoryButtonProps) {
  return (
    <Link
      href={url}
      className="w-max shrink-0 my-2 inline-flex items-center space-x-3 bg-[#F3F5FF] hover:bg-[#F5F5F5] text-terciary-blue font-medium leading-7 text-md lg:text-lg whitespace-nowrap p-2 md:p-3 drop-shadow-md drop-shadow-black/30 rounded-lg"
      aria-label={`Ir para categoria ${label}`}
    >
      <Image
        src={iconPath}
        className="size-6 lg:size-8"
        alt=""
        width={32}
        height={32}
        aria-hidden="true"
      />
      <span>{label}</span>
    </Link>
  );
}


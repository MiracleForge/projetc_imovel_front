import Image from "next/image";
import Link from "next/link";


import { categoryData } from "@/src/data/global.settings.data"

export default function CategoryNav() {
  return (
    <nav aria-label="Categorias" className="w-full">

      <ul className="flex px-1 xl:justify-center space-x-3 flex-nowrap overflow-x-auto scroll-smooth no-scrollbar">
        {categoryData.map((btn, index) => (
          <li key={index} className="shrink-0">
            <CategoryButton
              label={btn.name}
              url={`/icons/${encodeURI(btn.name)}`}
              iconPath={encodeURI(btn.name)}
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
      href={decodeURI(url)}
      className="w-max shrink-0 my-2 inline-flex items-center space-x-3 bg-[#F3F5FF] hover:bg-[#F5F5F5] text-terciary-blue font-medium leading-7 text-md lg:text-lg whitespace-nowrap p-2 md:p-3 drop-shadow-md drop-shadow-black/30 rounded-lg"
      aria-label={`Ir para categoria ${label}`}
    >
      <Image
        src={`/icons/${decodeURI(iconPath)}-categoria.svg`}
        className="size-6 lg:size-8"
        alt=""
        width={32}
        height={32}
        aria-hidden="true"
      />
      <span className="capitalize">{label.replace(/-/g, " ")}</span>
    </Link>
  );
}


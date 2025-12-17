import Image from "next/image";
import Link from "next/link";

import { categoryData } from "@/src/data/global.settings.data"
import HorizontalScroll from "../../context/ResponsiveHorizontalScroll.context";

export default function CategoryNav() {
  return (
    <nav aria-label="Categorias" className="w-full">
      <HorizontalScroll hideButtons>
        <ul className="w-max shrink-0 inline-flex items-center space-x-3 font-medium leading-7 whitespace-nowrap py-1 px-1 rounded-lg snap-x snap-mandatory">
          {categoryData.map((btn, index) => (
            <li key={index} className="shrink-0 snap-start">
              <CategoryButton
                label={btn.name}
                url={`/icons/${encodeURI(btn.name)}`}
                iconPath={encodeURI(btn.name)}
              />
            </li>
          ))}
        </ul>
      </HorizontalScroll>
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
      className="w-max shrink-0 inline-flex items-center space-x-3 bg-[#F3F5FF] hover:bg-[#F5F5F5] text-terciary-blue font-medium leading-7 whitespace-nowrap py-1 px-3 drop-shadow-md drop-shadow-black/30 rounded-lg"
      aria-label={`Ir para categoria ${label}`}
    >
      <Image
        src={`/icons/${decodeURI(iconPath)}-categoria.svg`}
        className="size-6 lg:size-5"
        alt=""
        width={28}
        height={28}
        aria-hidden="true"
      />
      <span className="capitalize">{label.replace(/-/g, " ")}</span>
    </Link>
  );
}


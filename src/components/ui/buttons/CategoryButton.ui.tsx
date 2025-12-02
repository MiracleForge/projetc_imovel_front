import Image from "next/image";
import Link from "next/link";

interface CategoryButtonProps {
  label: string;
  iconPath: string;
  url: string;
}

export default function CategoryButton({ label, url, iconPath }: CategoryButtonProps) {
  return <Link href={url} role="banner" className="w-max shrink-0 my-2 inline-flex items-center space-x-3 bg-[#F3F5FF] text-terciary-blue font-medium leading-7 text-md lg:text-lg whitespace-nowrap p-2 md:p-3 drop-shadow-sm drop-shadow-black/25 rounded-lg
  ">
    <Image src={iconPath} className="size-6 lg:size-8" alt={`Ir para ${label}`} width={32} height={32} />
    <span>{label}</span>
  </Link>
}

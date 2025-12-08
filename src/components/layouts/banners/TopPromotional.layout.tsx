import Link from "next/link";

export default async function TopPromotion() {

  return (
    <aside className="bg-black font-medium leading-[21px] text-center text-sm md:text-base p-2">Inauguração, publique seus anúncios gratuitamente apenas no mês de janeiro. <Link className="underline inline-flex items-center font-semibold text-base" href={"/register"}>Confira
      <svg
        className="size-4 ml-1 peer-checked/comprador:hidden"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
    </Link></aside>
  )
}

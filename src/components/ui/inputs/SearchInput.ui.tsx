import Image from "next/image";

export default function SearchInput() {
 return (
  <div className="w-full border-2 border-neutral-300 focus-within:border-black px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-black/20 rounded-lg">
   <form className="flex flex-row justify-between">

    <input
     className="p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 w-full"
     aria-label="Autocomplete"
     aria-autocomplete="both"
     placeholder="Buscar na olx"
     role="searchbox"
     aria-controls=""
     aria-expanded="false"
     aria-busy="false"
     autoComplete="off"
     spellCheck="false"
     type="text"
    />

    <button className="m-0">
     <span>
      <Image
       src={"/miscellaneous/search-icon.svg"}
       alt=""
       width={36}
       height={36}
       aria-label="hidden"
      />
     </span>
     <span className="sr-only">Buscar</span>
    </button>
   </form>
  </div>
 )
}


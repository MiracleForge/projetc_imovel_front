
export default function SearchInput() {
 return (
  <div className="border border-neutral-300 focus-within:border-black px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-black/20 rounded-lg">
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
  </div>
 )
}


import LikeButton from "../../ui/buttons/LikeButtons.ui";
import { formatPhone } from "@/src/utils/serialization/formatPhone.utils";

interface ContacInfoAreaProps {
  userActionButton: "like" | "subscribe";
  phone: string;
}
export default function ContacInforArea({ userActionButton, phone }: ContacInfoAreaProps) {
  return (
    <>
      <section className="mt-auto flex flex-col gap-3 text-black" aria-label="Ações principais">
        <div className="h-10 flex items-stretch gap-2.5">
          <button
            aria-label="Entrar em contato sobre este imóvel"
            className="flex-1 bg-secundary-blue text-white px-4 text-base font-semibold rounded-md flex items-center justify-center cursor-pointer"
          >
            Entre em Contato
          </button>

          <button
            role="button"
            aria-label="Compartilhar"
            className="relative w-14 border rounded-md cursor-pointer flex items-center justify-center"
          >
            <img src={"/miscellaneous/share-icon.svg"} width={16} height={16} alt="" className="size-4" />
          </button>


          <div
            role="button"
            aria-label="Favoritar imóvel"
            className="relative w-14 border rounded-md cursor-pointer flex items-center justify-center"
          >
            <LikeButton initialState={false} />
          </div>

        </div>
      </section>

      <nav aria-label="Ações de contato do anunciante">
        <div className="flex flex-wrap gap-2">

          <a
            href={phone ? `tel:${formatPhone(phone)}` : "#"}
            className="flex-1 min-w-fit inline-flex items-center justify-center gap-2 p-1 border rounded-sm border-foreground"
          >
            <img src="/miscellaneous/phone-icon.svg" alt="" aria-hidden="true" />
            <span>{phone ? formatPhone(phone) : "Não disponível"}</span>
          </a>

          <button
            type="button"
            className="flex-1 min-w-fit inline-flex items-center justify-center gap-2 p-1 border rounded-sm border-foreground cursor-pointer"
          >
            <img src="/miscellaneous/phone-icon.svg" alt="" aria-hidden="true" />
            <span>Chat</span>
          </button>

          <button
            type="button"
            className="flex-1 min-w-fit inline-flex items-center justify-center gap-2 p-1 border rounded-sm border-foreground cursor-pointer"
          >
            <img src="/miscellaneous/phone-icon.svg" alt="" aria-hidden="true" />
            <span>Agendar visita</span>
          </button>

        </div>
      </nav>
    </>
  )
}

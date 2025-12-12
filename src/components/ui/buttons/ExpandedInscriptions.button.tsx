"use client";

import Image from "next/image";
import Link from "next/link";
import UserAvatar from "../avatars/UserAvatar.ui";
import { Activity, useState } from "react";
import CommumButton from "./CommumButton.ui";
import { ItemInscriptionPanel } from "@/src/contracts/types/cards/responses.type";

const mockup: ItemInscriptionPanel[] = [
  {
    spaceId: "u1",
    ownerName: "Mariana Souza",
    ownerAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    hasNewPublication: true
  },
  {
    spaceId: "u2",
    ownerName: "Carlos Pereira",
    ownerAvatar: "https://randomuser.me/api/portraits/men/12.jpg",
    hasNewPublication: false
  },
  {
    spaceId: "u3",
    ownerName: "Ana Lima",
    ownerAvatar: "https://randomuser.me/api/portraits/women/8.jpg",
    hasNewPublication: true
  },
  {
    spaceId: "u4",
    ownerName: "João Mendes",
    ownerAvatar: "https://randomuser.me/api/portraits/men/33.jpg",
    hasNewPublication: false
  },
];



export default function ExpandedInscriptionButton({ userId }: { userId: string }) {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const panelId = "inscricoes-panel";

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => setExpanded(!isExpanded)}
        className="w-full inline-flex items-center space-x-3 px-3 py-1 border border-[#8C8C8C] bg-white hover:scale-[1.02] active:scale-[1.02] transition-all duration-200 font-medium cursor-pointer"
      >
        <Image
          src="/miscellaneous/inscricoes-icon.svg"
          width={18}
          height={18}
          unoptimized
          alt="" /* decorativo */
        />
        <span>Inscrições</span>

        <Image
          src="/miscellaneous/arrow-down-icon.svg"
          className="ml-auto"
          width={18}
          height={18}
          unoptimized
          alt="" /* decorativo */
        />
      </button>

      <Activity mode={isExpanded ? "visible" : "hidden"}>
        <InscriptionsPanel id={panelId} items={mockup} />
      </Activity>
    </div>
  );
}

function InscriptionsPanel({
  id,
  items,
  ...props
}: { id: string; items: ItemInscriptionPanel[] } & React.HTMLAttributes<HTMLUListElement>) {
  const orderedList = [...items].sort(
    (a, b) => Number(b.hasNewPublication) - Number(a.hasNewPublication)
  );

  return (
    <ul
      id={id}
      role="listbox"
      aria-label="Lista de inscrições"
      className="anchor px-3 py-2 space-y-1 overflow-y-scroll"
      {...props}
    >
      <CommumButton variant="ghost" url="/minhas-inscricoes" label="Ver Todos" />

      {orderedList.map((item, index) => {
        const title = `${item.ownerName}${item.hasNewPublication ? " — Nova publicação" : ""}`;

        return (
          <li
            key={item.spaceId ?? index}
            role="option"
            aria-selected={false}
            title={title}
            className="text-black hover:bg-neutral-100 text-base rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-medium hover:shadow-md"
          >
            <Link
              href={`/meu-espaço/${item.spaceId}`}
              aria-label={
                item.hasNewPublication
                  ? `${item.ownerName}, nova publicação disponível`
                  : item.ownerName
              }
              className="flex items-center space-x-6 w-full h-full px-4 py-1.5"
            >
              <UserAvatar size={26} image={item.ownerAvatar} />

              <p className="truncate">{item.ownerName}</p>

              {item.hasNewPublication && (
                <span
                  className="size-0.5 p-1 rounded-full ml-auto bg-primary-blue animate-pulse"
                  aria-label="Nova publicação"
                ></span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}


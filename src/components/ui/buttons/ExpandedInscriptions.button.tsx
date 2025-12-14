"use client";


import Image from "next/image";
import Link from "next/link";
import UserAvatar from "../avatars/UserAvatar.ui";
import { Activity, useEffect, useState } from "react";
import CommumButton from "./CommumButton.ui";
import { ItemInscriptionPanel } from "@/src/contracts/types/cards/responses.type";
import { createFetcher } from "@/src/utils/fetchData";

export default function ExpandedInscriptionButton() {
  const [isExpanded, setExpanded] = useState(false);
  const [userInscriptions, setUserInscriptions] =
    useState<ItemInscriptionPanel[] | null>(null);

  useEffect(() => {
    if (!isExpanded || userInscriptions) return;

    const fetchInscriptions = async () => {
      const inscriptionFetcher = createFetcher<undefined, ItemInscriptionPanel[]>(
        "https://free.mockerapi.com/mock/fc5bb54c-5ee2-4658-a135-6812bd9e5d4a",
        { method: "GET", isPublic: false }
      );

      const result = await inscriptionFetcher(undefined, { raw: true });
      if (Array.isArray(result)) {
        setUserInscriptions(result);
      }
    };

    fetchInscriptions();
  }, [isExpanded, userInscriptions]);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isExpanded}
        aria-controls={"inscricoes-panel"}
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full inline-flex items-center space-x-3 px-4 py-1 border border-[#8C8C8C] bg-white hover:scale-[1.02] active:scale-[1.02] transition-all duration-200 font-semibold cursor-pointer"
      >
        <Image
          src="/miscellaneous/inscricoes-icon.svg"
          width={18}
          height={18}
          unoptimized
          alt=""
        />
        <span>Inscrições</span>

        <Image
          src="/miscellaneous/arrow-down-icon.svg"
          className="ml-auto"
          width={18}
          height={18}
          unoptimized
          alt=""
        />
      </button>

      <Activity mode={isExpanded ? "visible" : "hidden"}>
        <InscriptionsPanel
          items={userInscriptions}
        />
      </Activity>
    </div>
  );
}

function InscriptionsPanel({
  items,
}: {
  items: ItemInscriptionPanel[] | null;
}) {
  if (!items) return null;
  //TODO: ADD A LOADING STATE HERE FOR BETTER UX
  return (
    <ul
      id="inscricoes-panel"
      role="listbox"
      aria-label="Lista de inscrições"
      className="anchor px-3 py-2 space-y-1 overflow-y-scroll"
    >
      <CommumButton
        variant="ghost"
        url="/minhas-inscricoes"
        label="Ver Todos"
      />

      {items.map((item) => {
        const title = `${item.ownerName}${item.hasNewPublication ? " — Nova publicação" : ""
          }`;

        return (
          <li
            key={item.spaceId}
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
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}


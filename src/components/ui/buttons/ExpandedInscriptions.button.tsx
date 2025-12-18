"use client";

import Image from "next/image";
import Link from "next/link";
import UserAvatar from "../avatars/UserAvatar.ui";
import { Activity, useState } from "react";
import CommumButton from "./CommumButton.ui";
import { ItemInscriptionPanel } from "@/src/contracts/types/cards/responses.type";
import { createFetcher } from "@/src/utils/fetchData";

export default function ExpandedInscriptionButton() {
  const [isExpanded, setExpanded] = useState(false);
  const [userSubscriptions, setUserInscriptions] =
    useState<ItemInscriptionPanel[] | null>(null);
  const [loading, setLoading] = useState(false);

  const openSubscription = async () => {
    const nextExpanded = !isExpanded;
    setExpanded(nextExpanded);

    if (nextExpanded && !userSubscriptions) {
      setLoading(true);

      const inscriptionFetcher = createFetcher<
        undefined,
        ItemInscriptionPanel[]
      >(
        "/api/subscriptions",
        { method: "GET", isPublic: false }
      );

      const result = await inscriptionFetcher(undefined, { raw: true });
      if (Array.isArray(result)) {
        setUserInscriptions(result);
      }

      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isExpanded}
        aria-controls="inscricoes-panel"
        onClick={openSubscription}
        className={`
          w-full flex items-center gap-3 px-4 py-2
          rounded-xl border bg-white
          transition-all duration-300
          font-semibold
          ${isExpanded
            ? "border-primary-blue shadow-md"
            : "border-[#8C8C8C] hover:shadow-sm"}
        `}
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
          width={18}
          height={18}
          unoptimized
          alt=""
          className={`
            ml-auto transition-transform duration-300
            ${isExpanded ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Panel */}
      <Activity mode={isExpanded ? "visible" : "hidden"}>
        <SubscriptionPanel items={userSubscriptions} loading={loading} />
      </Activity>
    </div>
  );
}

function SubscriptionPanel({
  items,
  loading,
}: {
  items: ItemInscriptionPanel[] | null;
  loading: boolean;
}) {
  return (
    <div
      id="inscricoes-panel"
      role="listbox"
      aria-label="Lista de inscrições"
      className="
        mt-3
        rounded-2xl
        bg-white
        shadow-xl
        border
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="px-4 py-3 border-b bg-neutral-50">
        <p className="text-sm font-semibold text-neutral-700">
          Minhas inscrições
        </p>
      </div>

      {/* Content */}
      <ul className="max-h-56 overflow-y-auto px-2 py-2 space-y-1">
        {loading && (
          <li className="px-4 py-3 text-sm text-neutral-500">
            Carregando inscrições…
          </li>
        )}

        {!loading && items?.length === 0 && (
          <li className="px-4 py-3 text-sm text-neutral-500">
            Nenhuma inscrição encontrada
          </li>
        )}

        {!loading &&
          items?.map((item) => (
            <li
              key={item.spaceId}
              role="option"
              className="
                rounded-xl transition-all
                hover:bg-neutral-100
                hover:shadow-sm
              "
            >
              <Link
                href={`/meu-espaço/${item.spaceId}`}
                className="flex items-center gap-4 px-4 py-2"
              >
                <UserAvatar size={28} image={item.advertiser.image} />

                <p className="truncate font-medium text-sm">
                  {item.advertiser.name}
                </p>

                {item.hasNewPublication && (
                  <span
                    className="ml-auto size-2 rounded-full bg-primary-blue animate-pulse"
                    aria-label="Nova publicação"
                  />
                )}
              </Link>
            </li>
          ))}
      </ul>

      {/* Footer */}
      <div className="border-t p-2">
        <CommumButton
          variant="ghost"
          url="/minhas-inscricoes"
          label="Ver todas as inscrições"
          className="w-full"
        />
      </div>
    </div>
  );
}


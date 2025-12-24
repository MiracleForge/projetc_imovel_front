"use client";

import Image from "next/image";
import Link from "next/link";
import UserAvatar from "../avatars/UserAvatar.ui";
import { Activity, useState } from "react";
import CommumButton from "./CommumButton.ui";
import { subscriptionGetById } from "@/src/app/actions/subscriptions.actions";
import { subscriptionsDTO } from "@/src/contracts/DTOs/user/views/subscriptions.dto";

export default function ExpandedInscriptionButton() {
  const [isExpanded, setExpanded] = useState(false);
  const [userSubscriptions, setUserInscriptions] =
    useState<subscriptionsDTO[] | null>(null);
  const [loading, setLoading] = useState(false);

  const openSubscription = async () => {
    const nextExpanded = !isExpanded;
    setExpanded(nextExpanded);

    if (nextExpanded && !userSubscriptions) {
      setLoading(true);

      const result = await subscriptionGetById();
      setUserInscriptions(result);

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
            ? "border-primary-blue shadow-md border-b-0 rounded-b-none"
            : "border-[#8C8C8C] hover:shadow-sm"}
        `}
      >
        <img
          src="/miscellaneous/inscricoes-icon.svg"
          width={18}
          height={18}
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
  items: subscriptionsDTO[] | null;
  loading: boolean;
}) {
  return (
    <div
      id="inscricoes-panel"
      role="listbox"
      aria-label="Lista de inscrições"
      className="
        rounded-2xl
        border
        border-primary-blue
        rounded-t-none
        bg-white
        shadow-xl
        overflow-hidden
      "
    >

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
          items?.map((item, index) => (
            <li
              key={index}
              role="option"
              className="
                rounded-xl transition-all
                hover:bg-neutral-100
                hover:shadow-sm"
              title={item.hasNewPublication ? "Nova Publicação" : ""}
            >
              <Link
                href={`/meu-espaço/${item.id}`}
                className="flex items-center gap-4 px-4 py-2"
              >
                <UserAvatar size={28} image={item.studiosOwner.image} />

                <p className="truncate font-medium text-sm">
                  {item.studiosOwner.name}
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
      <div className="p-2">
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


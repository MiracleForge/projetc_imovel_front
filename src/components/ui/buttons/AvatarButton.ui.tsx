//WARN: IF IN PRODUCTION VERCEL SAYS HYDRATATION ERROR SHOWING TOOLTIP OR THIS COMPONENTS, APPLY USE CLIENT AT TOP OF THIS FIle
//use client
//
import { Session } from "next-auth";
import Image from "next/image";
import FlowbitToolTip from "../tooltips/FlowbiteTooltip.ui";

interface AvatarButtonProps {
  user: NonNullable<Session["user"]>;
}
export default function AvatarButton({ user }: AvatarButtonProps) {
  const tooltipId = "avatarButtonTooltip";

  return (
    <div className="relative">
      <button
        aria-label={`Conta de ${user.name}`}
        data-tooltip-target={tooltipId}
        data-tooltip-placement="bottom"
        type="button"
        aria-expanded="false"
        aria-haspopup="listbox"
        tabIndex={0}
      >
        <div className="rounded-full p-0.5 inline-flex transition hover:shadow-[0_1px_5px_rgba(0,0,0,0.30)] w-[46px] h-[50px]">
          <Image
            src={user.image ?? "/micelanions/user-avatar.svg"}
            width={46}
            height={50}
            alt="avatar"
            className="rounded-full shrink-0 w-auto h-auto"
            aria-hidden="true"
            priority
          />
        </div>
      </button>

      <FlowbitToolTip tooltipId={tooltipId}>
        <p className="text-xs opacity-80">Sua Conta</p>
        <p className="font-semibold">{user.name}</p>
        <p className="text-xs opacity-80">{user.email}</p>
      </FlowbitToolTip>
    </div>
  );
}


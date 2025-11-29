import Image from "next/image";
import FlowbitToolTip from "../tooltips/FlowbiteTooltip.ui";
import Link from "next/link";

export default function UnauthenticatedButton() {
  const tooltipId = "avatarButtonTooltip";

  return (
    <div className="relative">
      <Link href={"/auth/entrar"}
        aria-label={`Login`}
        data-tooltip-target={tooltipId}
        data-tooltip-placement="bottom"
        role="button"
      >
        <div className="rounded-full p-0.5 inline-flex transition hover:shadow-[0_1px_5px_rgba(0,0,0,0.30)] w-[46px] h-[50px]">
          <Image
            src={"miscellaneous/user-avatar.svg"}
            width={46}
            height={50}
            alt="avatar"
            className="rounded-full shrink-0 w-auto h-auto"
            priority
          />
        </div>
      </Link>

      <FlowbitToolTip tooltipId={tooltipId}>
        <p className="text-xs opacity-80">Entre agora</p>
      </FlowbitToolTip>
    </div>
  );
}


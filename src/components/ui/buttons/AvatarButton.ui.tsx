//WARN: IF IN PRODUCTION VERCEL SAYS HYDRATATION ERROR SHOWING TOOLTIP OR THIS COMPONENTS, APPLY USE CLIENT AT TOP OF THIS FIle
//use client
//
import { Session } from "next-auth";
import Image from "next/image";
import SlideMenu from "../../layouts/headers/nav/SlideMenu.layout";

interface AvatarButtonProps {
  user: Session["user"] | null;
}

export default function AvatarButton({ user }: AvatarButtonProps) {
  const seed = user?.name?.trim() || "Guest";

  const avatarSrc = `https://api.dicebear.com/9.x/initials/png?seed=${encodeURIComponent(seed)}`;


  return (
    <div className="relative">
      <input
        type="checkbox"
        id="toggle-menu"
        className="hidden peer"
        aria-label="Abrir Menu"
      />

      <label htmlFor="toggle-menu" className="cursor-pointer">
        <div className="rounded-full p-0.5 inline-flex transition hover:shadow-[0_1px_5px_rgba(0,0,0,0.30)] w-[46px] h-[50px]">
          <Image
            src={avatarSrc}
            width={46}
            height={50}
            alt="avatar"
            className="rounded-full shrink-0 w-auto h-auto hover:opacity-80"
            priority
          />
        </div>
      </label>

      <SlideMenu toggleId="toggle-menu" />
    </div>
  );
}


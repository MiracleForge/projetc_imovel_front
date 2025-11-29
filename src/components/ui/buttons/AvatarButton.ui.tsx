//WARN: IF IN PRODUCTION VERCEL SAYS HYDRATATION ERROR SHOWING TOOLTIP OR THIS COMPONENTS, APPLY USE CLIENT AT TOP OF THIS FIle
//use client
//
import { Session } from "next-auth";
import SlideMenu from "../../layouts/headers/nav/SlideMenu.layout";
import UserAvatar from "../avatars/UserAvatar.ui";

interface AvatarButtonProps {
  user: Session["user"] | undefined;
}

export default function AvatarButton({ user }: AvatarButtonProps) {

  return (
    <div className="relative">
      <input
        type="checkbox"
        id="toggle-menu"
        className="hidden peer"
        aria-label="Abrir Menu"
      />

      <label htmlFor="toggle-menu" className="cursor-pointer" role="button" aria-controls="slide-menu" aria-expanded="false">
        <div className="rounded-full p-0.5 inline-flex transition hover:shadow-[0_1px_5px_rgba(0,0,0,0.30)] size-12">
          <UserAvatar image={user?.image} name={user?.name} />
        </div>
      </label>

      <SlideMenu toggleId="toggle-menu" user={user} />
    </div>
  );
}


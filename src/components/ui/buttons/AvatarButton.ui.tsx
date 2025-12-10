//WARN: IF IN PRODUCTION VERCEL SAYS HYDRATATION ERROR SHOWING TOOLTIP OR THIS COMPONENTS, APPLY USE CLIENT AT TOP OF THIS FIle
import { Session } from "next-auth";
import SlideMenu from "../../layouts/headers/nav/SlideMenu.layout";
import UserAvatar from "../avatars/UserAvatar.ui";

interface AvatarButtonProps {
  user: Session["user"] | undefined;
}

export default function AvatarButton({ user }: AvatarButtonProps) {

  return (
    <div className="relative">
      <input type="checkbox" id="toggle-menu" className="hidden peer" />

      <div className="fixed inset-0 bg-black/60 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition-opacity duration-300 z-40">
      </div>

      <label htmlFor="toggle-menu" className="cursor-pointer active:no-scrollbar">
        <UserAvatar image={user?.image} name={user?.name} size={36} />
      </label>

      <SlideMenu toggleId="toggle-menu" user={user} />
    </div>
  );
}


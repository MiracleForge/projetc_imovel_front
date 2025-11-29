import { Session } from "next-auth";
import SearchInput from "../../ui/inputs/SearchInput.ui";
import AvatarButton from "../../ui/buttons/AvatarButton.ui";
import ToHomeButton from "../../ui/buttons/ToHomeButton.ui";

interface NavbarProps {
  user: Session['user'] | undefined;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <header className="w-full relative">
      <nav className="flex flex-row items-center p-4 space-x-4">

        <ToHomeButton />

        <div className="flex-1 min-w-0 max-w-md">
          <SearchInput />
        </div>

        <AvatarButton user={user} />
      </nav>
    </header>
  )
}


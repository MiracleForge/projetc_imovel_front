import Image from "next/image"
import Link from "next/link"
import SearchInput from "../../ui/imputs/SearchInput.ui";
import AvatarButton from "../../ui/buttons/AvatarButton.ui";
import UnauthenticatedButton from "../../ui/buttons/UnauthenticatedButton.ui";
import { Session } from "next-auth";

interface NavbarProps {
  user: Session['user'] | null;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <header className="w-full">
      <nav className="flex flex-row items-center /justify-around p-4 space-x-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/logos/logo-gatu.webp"
            alt="Next.js logo"
            width={46}
            height={50}
            className="shrink-0"
            priority
          />
        </Link>

        <div className="flex-1 min-w-0 max-w-md">
          <SearchInput />
        </div>

        {user ? (
          <AvatarButton user={user} />
        ) : (
          <UnauthenticatedButton />
        )}
      </nav>
    </header>
  )
}


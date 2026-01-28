import { Session } from "next-auth";
import SearchInput from "../../ui/inputs/SearchInput.ui";
import AvatarButton from "../../ui/buttons/AvatarButton.ui";
import ToHomeButton from "../../ui/buttons/ToHomeButton.ui";
import CommumButton from "../../ui/buttons/CommumButton.ui";
import { StarIcon } from "../../ui/effects/ImobilyStudio.icon";

interface NavbarProps {
  user: Session["user"] | undefined;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <header className="w-full relative border-b border-foreground lg:px-6 xl:px-24">
      <nav className="flex flex-row items-center p-4 space-x-4 justify-start">
        <span className="inline-flex space-x-3 items-center">
          <ToHomeButton logoType="small" size={28} />
        </span>

        <div className="flex-1 min-w-0">
          <SearchInput />
        </div>

        <div className="inline-flex space-x-3 ml-auto">
          {user ? (
            <AuthenticatedNav user={user} />
          ) : (
            <UnauthenticatedNav />
          )}
        </div>
      </nav>
    </header>
  );
}

function AuthenticatedNav({ user }: { user: Session["user"] }) {
  return (
    <>
      <CommumButton
        label="Imobly Studios"
        url="/meus-anuncios"
        variant="highlight"
        className="group md:inline-flex space-x-3 items-center hidden"
      >
        <StarIcon />
      </CommumButton>

      <CommumButton
        label="Meus Anuncios"
        url="/meus-anuncios"
        className="hidden md:block"
      />

      <CommumButton
        label="Anúnciar"
        url="/criar-anuncio"
        className="hidden md:block"
      />

      <CommumButton
        label="Chat"
        url="/chat"
        className="hidden lg:block"
      />

      <AvatarButton user={user} />
    </>
  );
}


function UnauthenticatedNav() {
  return (
    <>
      <CommumButton
        label="Anúnciar"
        url="/auth/entrar"
        className="hidden md:block"
      />

      <CommumButton
        label="Imobily Studio"
        url="/auth/entrar"
        variant="highlight"
        className="hidden md:inline-flex gap-3"
      >
        <StarIcon />
      </CommumButton>

      <CommumButton
        label="Chat"
        url="/auth/registrar"
        className="hidden lg:block"
      />

      <AvatarButton user={undefined} />
    </>
  );
}

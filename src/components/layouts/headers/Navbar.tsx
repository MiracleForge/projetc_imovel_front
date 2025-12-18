import { Session } from "next-auth";
import SearchInput from "../../ui/inputs/SearchInput.ui";
import AvatarButton from "../../ui/buttons/AvatarButton.ui";
import ToHomeButton from "../../ui/buttons/ToHomeButton.ui";
import CommumButton from "../../ui/buttons/CommumButton.ui";

interface NavbarProps {
  user: Session['user'] | undefined;
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
          {user &&
            <>

              <CommumButton label="Imobly Studios" url={`${user ? "/meus-anuncios" : "auth/entrar"}`} variant={"highlight"} className="group md:inline-flex space-x-3 items-center hidden">

                <svg
                  className="group-hover:animate-pulse"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    d="M13 1.5L15.7 8.3L22.5 11L15.7 13.7L13 20.5L10.3 13.7L3.5 11L10.3 8.3L13 1.5Z"
                    fill="currentColor"
                  />
                  <circle cx="21" cy="5" r="1.4" fill="currentColor" opacity="0.85" />
                  <circle cx="5.5" cy="20" r="1" fill="currentColor" opacity="0.55" />
                </svg>

              </CommumButton>

              <CommumButton label="Meus Anuncios" url={`${user ? "/meus-anuncios" : "auth/entrar"}`} className="hidden md:block" />
            </>
          }

          <CommumButton label="Anúnciar" url={`${user ? "/criar-anuncio" : "auth/entrar"}`} className="hidden md:block" />

          {!user && <CommumButton label="Nova Conta" url="auth/registrar" className="hidden lg:block" />}

          <CommumButton label="Chat" url="auth/registrar" className="hidden lg:block" />

          <AvatarButton user={user} />
        </div>

      </nav>
    </header>
  )
}

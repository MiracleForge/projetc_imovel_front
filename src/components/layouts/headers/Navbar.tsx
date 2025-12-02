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
    <header className="w-full relative border-b border-foreground">
      <nav className="flex flex-row items-center p-4 space-x-4 justify-between">

        <span className="inline-flex space-x-3 items-center">
          <ToHomeButton /> <span className="hidden lg:block font-bold text-black text-2xl">Chave do PLX</span>
        </span>

        <div className="flex-1 min-w-0 max-w-md">
          <SearchInput />
        </div>

        <div className="inline-flex space-x-3">
          {user && <CommumButton label="Meus Anuncios" url={`${user ? "/meus-anuncios" : "auth/entrar"}`} className="hidden md:block" />}
          <CommumButton label="Anúnciar" url={`${user ? "/criar-anuncio" : "auth/entrar"}`} className="hidden md:block" />
          {!user && <CommumButton label="Nova Conta" url="auth/registrar" className="hidden md:block" />}
          <AvatarButton user={user} />
        </div>

      </nav>
    </header>
  )
}

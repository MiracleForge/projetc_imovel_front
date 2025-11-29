import { User } from "next-auth";
import UserAvatar from "@/src/components/ui/avatars/UserAvatar.ui";
import Image from "next/image";
import Link from "next/link";
import CommumButton from "@/src/components/ui/buttons/CommumButton.ui";
import ToHomeButton from "@/src/components/ui/buttons/ToHomeButton.ui";
import { createFetcher } from "@/src/utils/fetchData";

interface SlideNavbarProps {
  toggleId: string;
  user: User | undefined;
};

export default function SlideMenu({ toggleId, user }: SlideNavbarProps) {
  const { name, email, image } = user ?? {};

  return (
    <nav className="
        fixed top-0 right-0 h-screen
        w-screen md:max-w-sm
        p-4
        transform translate-x-full opacity-0
        peer-checked:translate-x-0 peer-checked:opacity-100
        transition-transform duration-300 ease-in-out
        z-50
        shadow bg-white
      "
      role="navigation"
      aria-label="Menu lateral"
      id="slide-menu"
    >

      <div className="flex w-full items-center p-4">
        {!user && <ToHomeButton />}
        <p className="text-sm font-light text-center flex-1">
          {email}
        </p>

        <label
          htmlFor={toggleId}
          className="cursor-pointer shrink-0 p-4 -m-4"
          role="button"
        >
          <Image
            src="/miscellaneous/close-icon.svg"
            width={16}
            height={16}
            alt="Fechar menu"
          />
        </label>

      </div>

      <span className="my-3">
        {user ? (
          <AuthenticatedSegment name={name} image={image} />
        ) : (
          <UnAuthenticatedSegment />
        )}
      </span>

      <BannerSegment />
    </nav>
  );
}


interface LoggedSegmentProps {
  name: string | null | undefined;
  image: string | null | undefined;
}

function AuthenticatedSegment({ name, image }: LoggedSegmentProps) {
  return (
    <div className="flex flex-col w-full justify-center items-center space-y-3 mt-3">
      <UserAvatar image={image} name={name} size={72} />
      <p>Olá, {name}!</p>
      <CommumButton label="Gerenciar Conta" url="#" aria-label="Gerenciar Conta do Usuário" />
      <Link href={"#"} className="border-default rounded-3xl w-full text-center" role="button" aria-label="Gerenciar Conta">
        Meu Espaço
      </Link>
    </div>
  );
}

function UnAuthenticatedSegment() {
  return (
    <span className="gap-y-4 flex flex-col mt-3">
      <div className="
      grid grid-cols-[auto_1fr]
      w-full items-center
      bg-secundary-blue/80 p-3 rounded-xl
      gap-4 border-foreground
    ">

        <span className="bg-foreground p-2 rounded-full shrink-0">
          <UserAvatar size={26} />
        </span>

        <p className="text-sm text-black">
          Entre na comunidade onde os anúncios e os corretores se encontram
        </p>

        <div className="col-span-2 grid grid-cols-2 gap-3 w-full">
          <CommumButton label="Entrar" url="/auth/entrar" />
          <CommumButton label="Criar Conta" url="/auth/entrar" />
        </div>

      </div>
    </span>
  );
}

type bannerProps = { title: string, paragraph: string, buttonLabel: string, url: string }
function BannerSegment() {
  const path = "http://localhost:3000"
  const bannerFecher = createFetcher<undefined, bannerProps[]>(path, { method: "GET", isPublic: true })
  return (
    <div className="flex w-full mt-3 border border-foreground rounded-xl p-1 gap-3">

      {/* Imagem */}
      <div
        className="
      w-full rounded-xl
      bg-[url('/banner.jpg')]
      bg-right
      bg-no-repeat
      min-h-[100px]
    "
      ></div>

    </div>
  );
}


import { User } from "next-auth";
import UserAvatar from "@/src/components/ui/avatars/UserAvatar.ui";
import Image from "next/image";
import Link from "next/link";
import CommumButton from "@/src/components/ui/buttons/CommumButton.ui";
import { createFetcher } from "@/src/utils/fetchData";
import SignOutButton from "@/src/components/ui/buttons/SignOutButton.ui";

interface SlideNavbarProps {
  toggleId: string;
  user: User | undefined;
}

export default async function SlideMenu({ toggleId, user }: SlideNavbarProps) {
  const { name, email, image } = user ?? {};

  const fetchBanner = createFetcher<undefined, bannerProps[]>(
    "http://localhost:3000/api/banner",
    { method: "GET", isPublic: true }
  );

  const bannerResponse = await fetchBanner();
  const banner = bannerResponse.data;

  return (
    <nav
      className="
        fixed top-0 right-0 h-screen 
        w-screen max-w-md md:max-w-sm
        p-4
        transform translate-x-full opacity-0
        peer-checked:translate-x-0 peer-checked:opacity-100
        transition-transform duration-300 ease-in-out
        z-50 shadow bg-white overflow-y-auto"
      role="navigation"
      aria-label="Menu lateral"
      id="slide-menu"
    >

      <div className="flex w-full p-4 border-b">
        <span className="my-3 flex justify-around w-full">
          {user ? (
            <AuthenticatedSegment name={name} image={image} email={email} />
          ) : (
            <UnAuthenticatedSegment />
          )}
          <label
            htmlFor={toggleId}
            className="cursor-pointer shrink-0 p-4 -m-4"
            role="button"
          >
            <Image
              src="/miscellaneous/close-icon.svg"
              width={16}
              height={16}
              unoptimized
              alt="Fechar menu"
              loading="lazy"
            />
          </label>
        </span>
      </div>

      <BannerSegment banner={banner} />
      <OptionsSegment />
      <SignOutButton />
      <FooterSegment />
    </nav>
  );
}

interface AuthenticatedSegmentProps {
  email: string | null | undefined;
  name: string | null | undefined;
  image: string | null | undefined;
}

function AuthenticatedSegment({ name, image, email }: AuthenticatedSegmentProps) {
  return (
    <div className="inline-flex space-x-6 w-full items-center space-y-3 mt-3">
      <UserAvatar image={image} name={name} size={72} />
      <span className="block">
        <p className="block">Olá, {name}!</p>
        <p className="text-sm font-light text-center flex-1">{email}</p>
      </span>
    </div>
  );
}

function UnAuthenticatedSegment() {
  return (
    <span className="gap-y-4 flex flex-col mt-3">
      <div
        className="
        grid grid-cols-[auto_1fr]
        w-full items-center
        bg-secundary-blue/80 p-3 rounded-xl
        gap-4 border-foreground
      "
      >
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

type bannerProps = {
  title: string;
  paragraph: string;
  url: string;
  bannerImg: {
    alt: string
    src: string;
  }
};

function BannerSegment({ banner }: { banner: bannerProps[] | undefined }) {
  const item = banner?.[0];

  return (
    <Link
      href={item?.url ?? "#"}
      role="banner"
      className="flex w-full mt-3 border border-foreground rounded-xl p-1 gap-3"
    >
      <div
        className="
        w-full rounded-xl
        bg-[url('/banners/slide-menu-banner.jpg')]
        bg-right bg-no-repeat bg-cover
        min-h-[140px]
      ">
      </div>
    </Link>
  );
}

function OptionsSegment() {
  return (
    <>
      <div className="space-y-3 mt-3">
        <CommumButton label="Gerenciar Conta" url="#" />

        <CommumButton
          label=""
          url="#"
          className="flex flex-row justify-around w-full items-center"
        >
          <span className="mr-auto flex flex-row gap-x-3">
            <Image
              src="/miscellaneous/user-avatar.svg"
              width={26}
              height={26}
              unoptimized
              alt="User"
            />
            Meu Espaço
          </span>

          <div className="w-fit px-3 py-1 bg-secundary-blue rounded-xl text-white font-bold">
            Descubra
          </div>
        </CommumButton>

        <CommumButton
          label="Meus Anúncios"
          url="#"
          className="text-start flex flex-row space-x-3"
        >
          <Image
            src="/miscellaneous/user-avatar.svg"
            width={26}
            height={26}
            unoptimized
            alt="User"
            loading="lazy"
          />
        </CommumButton>

        <CommumButton
          label="Chat"
          url="#"
          className="text-start flex flex-row space-x-3"
        >
          <Image
            src="/miscellaneous/user-avatar.svg"
            width={26}
            height={26}
            unoptimized
            alt="User"
            loading="lazy"
          />
        </CommumButton>
      </div>

      <div className="flex space-x-3 mt-3">
        <CommumButton label="Configurações" url="#" className="w-full" />
        <CommumButton label="Ajuda" url="#" className="w-full" />
      </div>
    </>
  );
}

function FooterSegment() {
  return (
    <footer className="flex flex-row justify-around space-x-3 w-full mt-6 text-sm">
      <Link href={"politicas-privacidade"}>
        <span className="link-default">Políticas de Privacidade</span>
      </Link>
      <Link href={"/termos-de-uso"}>
        <span className="link-default">Termos de uso</span>
      </Link>
    </footer>
  );
}


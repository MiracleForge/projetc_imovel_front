import { User } from "next-auth";
import UserAvatar from "@/src/components/ui/avatars/UserAvatar.ui";
import Image from "next/image";
import Link from "next/link";
import CommumButton from "@/src/components/ui/buttons/CommumButton.ui";
import { createFetcher } from "@/src/utils/fetchData";
import SignOutButton from "@/src/components/ui/buttons/SignOutButton.ui";
import ExpandedInscriptionButton from "@/src/components/ui/buttons/ExpandedInscriptions.button";

interface SlideNavbarProps {
  toggleId: string;
  user: User | undefined;
}

export default async function SlideMenu({ toggleId, user }: SlideNavbarProps) {
  const { name, email, image } = user ?? {};
  const isLogged = !!user;

  const fetchBanner = createFetcher<undefined, bannerProps[]>(
    "http://localhost:3000/api/banner",
    { method: "GET", isPublic: true }
  );

  const bannerResponse = await fetchBanner();
  const banner = bannerResponse.data;

  return (
    <nav
      className="
    fixed top-0 right-0 h-dvh
    w-screen max-w-md md:max-w-sm
    px-6
    flex flex-col
    transform translate-x-full opacity-0
    peer-checked:translate-x-0 peer-checked:opacity-100
    transition-transform duration-300 ease-in-out
    z-50 shadow bg-white overflow-y-auto text-black font-normal"
    >
      <label
        htmlFor={toggleId}
        className="cursor-pointer shrink-0 border-b border-b-foreground items-end place-items-end grid p-3 -mx-6 bg-[#F3F5FF]"
        role="button"
      >
        <Image
          src="/miscellaneous/close-icon.svg"
          className="m-0"
          width={16}
          height={16}
          unoptimized
          alt="Fechar menu"
          loading="lazy"
        />
      </label>

      {user ? (
        <AuthenticatedSegment name={name} image={image} email={email} />
      ) : (
        <UnAuthenticatedSegment />
      )}
      <BannerSegment banner={banner} />
      <OptionsSegment logged={isLogged} userId={user?.name!} />
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
    <div className="w-full flex flex-col justify-center items-center space-x-6 space-y-3 mt-2 text-xs">
      <p >{email}</p>
      <UserAvatar image={image} name={name} size={62} />
      <p >Olá, {name}!</p>
    </div>
  );
}



function UnAuthenticatedSegment() {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-3 mt-3 text-xs">
      <img src={"/logos/imobily-logo.svg"} width={46} height={46} />
      <CommumButton label="Entrar" url="/auth/entrar" rounded="none" variant="secondary" className="px-10 py-1" shadows={"hard"} />
      <div className="text-sm font-medium text-black"> <span> Não possue conta ? </span> <Link className="text-primary-blue" href={"/auth/register"}> Registre-se agora! </Link> </div>
    </div>);
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
      className="flex w-full mt-3 rounded-lg gap-3"
    >
      <div
        className="
        w-full rounded-2xl
        bg-[url('/banners/slide-menu-banner.jpg')]
        bg-right bg-no-repeat bg-cover
        min-h-[140px]
      ">
      </div>
    </Link>
  );
}


function OptionsSegment({ logged, userId }: { logged: boolean, userId: string | undefined }) {
  return (
    <div className="flex flex-col mt-4 h-full">

      {/* Itens de cima */}
      <div className="space-y-3">
        <CommumButton className="w-full items-center inline-flex space-x-3" label="Gerenciar Conta" url="#" variant="secondary" rounded="none">
          <Image src="/miscellaneous/config-icon.svg" width={18} height={18} unoptimized alt="" />
        </CommumButton>

        <CommumButton
          className="group w-full items-center inline-flex space-x-3 px-2" label="Imobly Studios" url="#" variant="highlight" rounded="none">
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

        <CommumButton className="w-full items-center inline-flex space-x-3" label="Chat" url="#" variant="secondary" rounded="none">
          <Image src="/miscellaneous/chat-icon.svg" width={18} height={18} unoptimized alt="" />
        </CommumButton>

        {logged && userId && (
          <div className="space-y-3">
            <ExpandedInscriptionButton />
            <SignOutButton />
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 flex space-x-3">
        <CommumButton className="w-1/2 text-center" label="Configurações" url="#" rounded="sm" variant="coal" shadows="hard" />
        <CommumButton className="w-1/2 text-center" label="Ajuda" url="#" rounded="sm" variant="coal" shadows="hard" />
      </div>
    </div>
  );
}


function FooterSegment() {
  return (
    <footer className="flex flex-row justify-around space-x-3 w-full my-3 -mx-3 text-sm">
      <Link href={"politicas-privacidade"}>
        <span className="link-default">Políticas de Privacidade</span>
      </Link>
      <Link href={"/termos-de-uso"}>
        <span className="link-default">Termos de uso</span>
      </Link>
    </footer>
  );
}


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
    z-50 bg-white/95 backdrop-blur-xl shadow-2xl border-l
 overflow-y-auto text-black font-normal"
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
    <div className="
      relative -mx-6 px-6 py-6
      bg-gradient-to-br from-[#F3F5FF] to-white
      border-b
      flex flex-col items-center gap-2
    ">
      <UserAvatar image={image} name={name} size={72} />

      <p className="font-semibold text-sm text-black">
        {name}
      </p>

      <p className="text-xs text-neutral-500">
        {email}
      </p>
    </div>
  );
}




function UnAuthenticatedSegment() {
  return (
    <div className="
      -mx-6 px-6 py-6
      bg-gradient-to-br from-[#F3F5FF] to-white
      border-b
      flex flex-col items-center gap-4
    ">
      <img src="/logos/imobly-logo.svg" width={48} height={48} />

      <CommumButton
        label="Entrar"
        url="/auth/entrar"
        variant="highlight"
        rounded="full"
        className="w-full"
      />

      <p className="text-sm text-neutral-600">
        Ainda não tem conta?
        <Link className="ml-1 font-semibold text-primary-blue" href="/auth/register">
          Criar agora
        </Link>
      </p>
    </div>
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
      className="
        relative mt-4 overflow-hidden rounded-2xl
        min-h-[140px]
        group
      "
    >
      <div
        className="absolute inset-0 bg-cover bg-right"
        style={{ backgroundImage: "url('/banners/slide-menu-banner.jpg')" }}
      />

      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

      <div className="relative z-10 p-4 text-white">
        <p className="text-sm font-semibold">
          Destaque da semana
        </p>
        <p className="text-xs text-white/80 mt-1">
          Conheça oportunidades exclusivas
        </p>
      </div>
    </Link>
  );
}



function OptionsSegment({ logged, userId }: { logged: boolean; userId?: string }) {
  return (
    <div className="flex flex-col mt-6 flex-1">

      {/* Conta */}
      <div className="space-y-2">
        <SectionTitle>Minha conta</SectionTitle>

        <MenuButton label="Gerenciar conta" icon="/miscellaneous/config-icon.svg" />
        <MenuButton label="Chat" icon="/miscellaneous/chat-icon.svg" />
      </div>

      {/* Destaque */}
      <div className="mt-6">
        <SectionTitle>Destaque</SectionTitle>

        <CommumButton
          label="Imobily Studios"
          url="#"
          variant="highlight"
          className="w-full inline-flex gap-3"
          rounded="md">
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


        </CommumButton >
      </div>

      {/* Ações */}
      {logged && (
        <div className="mt-6 space-y-3">
          <ExpandedInscriptionButton />
          <SignOutButton />
        </div>
      )}

      {/* Footer actions */}
      <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
        <CommumButton label="Configurações" url="#" variant="coal" />
        <CommumButton label="Ajuda" url="#" variant="coal" />
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


function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
      {children}
    </p>
  );
}

function MenuButton({ label, icon }: { label: string; icon: string }) {
  return (
    <CommumButton
      label={label}
      url="#"
      variant="secondary"
      rounded="md"
      className="w-full flex items-center gap-3 px-4"
    >
      <Image src={icon} width={18} height={18} unoptimized alt="" />
    </CommumButton>
  );
}


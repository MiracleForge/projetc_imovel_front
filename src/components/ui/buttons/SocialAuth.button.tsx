import Image from "next/image"

interface SocialButtonInterface { action: "login" | "register" }

export const SocialAuthButton = ({ action }: SocialButtonInterface) => {
  return (
    <div className="flex flex-row justify-center gap-6" >
      <button type="button" className="cursor-pointer hover:bg-gray-200 p-2 rounded-full">
        <Image src="/logos/devicon_google.svg"
          alt="Next.js logo"
          width={36}
          height={36}
          priority
        />
      </button>

      <button type="button"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-full"
      >
        <Image
          src="/logos/logos_facebook.svg"
          alt="Next.js logo"
          width={36}
          height={36}
          priority
        />
      </button>

      <button type="button"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-full"
      >
        <Image
          className="size-9"
          src="/logos/ic_outline-apple.svg"
          alt="Next.js logo"
          width={36}
          height={36}
          priority
        />
      </button>
    </div>

  )
}


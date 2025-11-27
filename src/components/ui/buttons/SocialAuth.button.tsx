import Image from "next/image"
import { handleGitHubSignIn } from "@/src/app/actions/auth.actions"
import { signIn } from "next-auth/react"

export const SocialAuthButton = () => {
  //TODO: CRIAR UMA ACTION GENERICA PARA TODOS OS PROVEDORES, UM ARRAY DATA PARA GERAR COM MAP OS BOTOES PARA EVITAR REPETIR <FORM>
  return (
    <div className="flex flex-row justify-center gap-6" >
      <button
        type="submit"
        onClick={() => signIn("google", { callbackUrl: "/", prompt: "consent", })}
        className="group cursor-pointer rounded-full p-2 hover:bg-gray-200 transition"
      >
        <span className="flex items-center justify-center w-9 h-9">
          <Image
            src="/logos/devicon_google.svg"
            alt="Github logo"
            width={36}
            height={36}
            priority
            className="pointer-events-none"
          />
        </span>
      </button>

      <button
        type="submit"
        onClick={() => signIn("github", { callbackUrl: "/", prompt: "consent", })}
        className="group cursor-pointer rounded-full p-2 hover:bg-gray-200 transition"
      >
        <span className="flex items-center justify-center w-9 h-9">
          <Image
            src="/logos/github_login.svg"
            alt="Github logo"
            width={36}
            height={36}
            priority
            className="pointer-events-none"
          />
        </span>
      </button>

      <button
        type="submit"
        onClick={() => signIn("facebook", { callbackUrl: "/", prompt: "consent", })}
        className="group cursor-pointer rounded-full p-2 hover:bg-gray-200 transition"
      >
        <span className="flex items-center justify-center w-9 h-9">
          <Image
            src="/logos/logos_facebook.svg"
            alt="Next.js logo"
            width={36}
            height={36}
            priority
          />
        </span>
      </button>
    </div>

  )
}


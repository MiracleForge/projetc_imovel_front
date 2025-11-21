import Image from "next/image"
import UrlReferencyButton from "../../ui/buttons/UrlRefency.buttons"
import Link from "next/link"

export const CompactHeader = () => {
  return (
    <header className="flex flex-row justify-between p-6 z-9999 relative">
      <Link href={"/"}>
        <Image
          className=""
          src="/logos/logo-gatu.webp"
          alt="Next.js logo"
          width={46}
          height={50}
          priority
        />
      </Link>
      <UrlReferencyButton />
    </header>
  )
}


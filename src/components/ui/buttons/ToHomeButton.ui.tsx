import Image from "next/image";
import Link from "next/link";

export default function ToHomeButton() {
  return <Link href="/" className="shrink-0"
    role="button"
    aria-label="Ir para a página inicial"
    title="Páginia inicial do plx"
  >
    <Image
      src="/logos/logo-gatu.webp"
      alt="Logo"
      width={42}
      height={42}
      className="shrink-0 h-auto w-auto"
      priority
    />
  </Link>
}

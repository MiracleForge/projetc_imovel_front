import Link from "next/link";

export default function ToHomeButton({ logoType, size }: { logoType?: "full" | "small" | "studio", size: number }) {
  const logos = {
    full: "/logos/imobly-full-logo.svg",
    small: "/logos/imobly-logo.svg",
    studio: "/logos/imobly-studio-logo.svg",
  };

  const logoSrc = logos[logoType ?? "small"]

  return <Link href="/" className="shrink-0"
    role="button"
    aria-label="Ir para a página inicial"
    title="Páginia inicial do Imobly"
  >
    <img
      src={logoSrc}
      alt="Imobly Logo"
      width={size}
      height={size}
      className="shrink-0"
    />
  </Link>
}

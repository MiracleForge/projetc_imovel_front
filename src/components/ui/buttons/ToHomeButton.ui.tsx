import Image from "next/image";
import Link from "next/link";

export default function ToHomeButton() {
  return <Link href="/" className="shrink-0" role="button">
    <Image
      src="/logos/logo-gatu.webp"
      alt="Next.js logo"
      width={46}
      height={50}
      className="shrink-0"
      priority
    />
  </Link>
}



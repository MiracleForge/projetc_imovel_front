import Image from "next/image";
import Link from "next/link";

export default function SectionFeature() {
  return (
    <section className="space-component-to-component flex flex-col border-b pb-6">
      <h2 className="tipografy-title pb-8">Confira Também</h2>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">

        <FeatureCard backgroundUrl="/banners/features/apartamentos-decorados.png" buttonLabel="Apartamentos" text="Apartamento decorados prontos para morar" subText="" />
        <FeatureCard backgroundUrl="/banners/features/compra-na-planta.png" buttonLabel="Compre seu Imóvel" />

      </div>
    </section>
  )
}

interface FeatureCardProps {
  text?: string;
  subText?: string;
  buttonLabel?: string;
  url?: string;
  backgroundUrl: string;
}

function FeatureCard({ buttonLabel, text, subText, url, backgroundUrl }: FeatureCardProps) {
  return (
    <Link href={url ?? "#"} className="group relative w-full aspect-3/2 md:aspect-2/1 overflow-hidden">
      <div className="absolute top-12 left-3 z-10 text-white space-y-6 w-1/3 text-center">
        <button className="group-hover:cursor-pointer bg-quartenary-blue font-medium p-3 rounded-3xl">{buttonLabel}</button>
        <p className="font-bold text-xl">{text}</p>
        <p className="font-bold text-lg">{subText}</p>
        <button className="group-hover:cursor-pointer bg-quartenary-blue font-medium p-3 rounded-3xl">Veja agora</button>
      </div>
      <Image src={backgroundUrl} alt={subText ?? "Confira"}
        fill />
    </Link>
  )
}

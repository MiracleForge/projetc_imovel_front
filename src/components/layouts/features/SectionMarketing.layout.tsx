import {
  MarketingKey,
  MARKETING_MAP,
} from "@/src/content/marketing.content";

interface SectionMarketingProps {
  keys: MarketingKey[];
  value?: string[];
  simple?: boolean;
}

export default function SectionMarketing({ keys, value, simple = false }: SectionMarketingProps) {
  if (!keys) return null;
  const keysToRender = keys;

  const itemsToRender = keysToRender.map(
    (key) => MARKETING_MAP[key]
  );

  return (
    <section className={`${simple === false ? "bg-quartenary-blue text-white" : "bg-white text-black border-t border-t-foreground"} py-12 px-6 rounded-3xl`}>
      <ul className="flex flex-col lg:flex-row justify-around gap-6">
        {itemsToRender.map(({ key, ...item }, index) => (
          <SectionItem key={`${key}+ ${index}`} {...item} values={value?.[index]} />
        ))}
      </ul>
    </section>
  );
}

function SectionItem({
  img: { imgSrc, imgAlt },
  title,
  subTitle,
  values
}: {
  img: { imgSrc: string; imgAlt: string };
  title: string;
  subTitle: string;
  values?: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <img src={imgSrc} alt={imgAlt} className="w-20 h-20" />
      <div>
        <p className="font-semibold text-2xl">{title}</p>
        <p className="font-normal text-lg space-x-2"><span>{values}</span><span>{subTitle}</span></p>
      </div>
    </li>
  );
}


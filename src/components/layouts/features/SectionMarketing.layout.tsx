import { MARKETING_ITEMS } from "@/src/content/marketing.content";

export default function SectionMarketing() {
  return (
    <section className="bg-quartenary-blue py-12 px-6 rounded-3xl">
      <ul className="flex flex-col lg:flex-row justify-around gap-6">
        {MARKETING_ITEMS.map((item, index) => (
          <SectionItem key={index} {...item} />
        ))}
      </ul>
    </section>
  );
}

function SectionItem({
  img: { imgSrc, imgAlt },
  title,
  subTitle,
}: {
  img: { imgSrc: string; imgAlt: string };
  title: string;
  subTitle: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-20 h-20"
      />
      <div>
        <p className="font-semibold text-2xl text-white">{title}</p>
        <p className="font-normal text-lg text-white">{subTitle}</p>
      </div>
    </li>
  );
}


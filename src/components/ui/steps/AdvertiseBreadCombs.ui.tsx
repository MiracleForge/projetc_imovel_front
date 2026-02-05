import Link from "next/link";

type AdvertiseBreadCombsProps = {
  category: string;
  propertySlug: string;
};

export default function AdvertiseBreadCombs({
  category,
  propertySlug
}: AdvertiseBreadCombsProps) {
  return (
    <div
      className="mb-4 rounded p-3 text-neutral-secondary text-sm"
      aria-label="Breadcrumb"
    >
      <nav
        aria-label="breadcrumb"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <ol className="flex gap-2 font-normal text-lg">
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link href="/" itemProp="item">
              <span itemProp="name">Início</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>

          <span>/</span>

          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link href={`/anuncios/${category}`} itemProp="item">
              <span className="capitalize" itemProp="name">{(category.replace(/-/g, " "))}</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>

          <span>/</span>

          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <span className="text-black" itemProp="name">{propertySlug.replace(/-/g, " ")}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>
    </div>
  );
}


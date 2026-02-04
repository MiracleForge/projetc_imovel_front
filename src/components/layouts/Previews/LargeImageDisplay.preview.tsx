import Image, { ImageProps } from "next/image";
import React from "react";

interface LargeDisplayProps extends Omit<ImageProps, "fill"> {
  fallback: string;
}

const LargeDisplay = ({
  src,
  alt,
  fallback,
  ...props
}: LargeDisplayProps) => {
  return (
    <div
      className="group relative w-full h-full overflow-hidden rounded-lg aspect-video cursor-pointer"
      role="img"
      aria-label={"Abrir galeria de imagens"}
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <Image
        src={src}
        alt={alt || "Imagem do imóvel"}
        fill
        loading="lazy"
        itemProp="contentUrl"
        className="object-cover rounded-lg hover:scale-110 transition-transform"
        {...props}
        onError={(event: React.SyntheticEvent<HTMLImageElement>) => {
          const target = event.currentTarget;
          if (!target.srcset.includes(fallback)) {
            target.srcset = fallback;
          }
        }}
      />

      <img
        src="/miscellaneous/expandir-area.svg"
        width={16}
        height={16}
        alt=""
        aria-hidden="true"
        role="presentation"
        className="absolute size-12 origin-top-right right-2 top-6 bg-white/20 rounded-lg group-hover:scale-105 p-2 pointer-events-none"
      />
    </div>
  );
};

export default LargeDisplay;


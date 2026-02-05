import Image, { ImageProps } from 'next/image';

interface SmallDisplayProps extends Omit<ImageProps, 'fill'> {
  fallback: string;
}

const SmallDisplay = ({ src, alt, fallback, ...rest }: SmallDisplayProps) => {
  const srcToUse = src || fallback;

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg">
      <Image
        src={srcToUse}
        alt={alt}
        fill
        className="object-cover rounded-lg hover:scale-110 transition-transform"
        {...rest}
        onError={(event: React.SyntheticEvent<HTMLImageElement>) => {
          const target = event.currentTarget;
          if (!target.srcset.includes(fallback)) {
            target.srcset = fallback;
          }
        }}
      />
    </div>
  );
};

export default SmallDisplay;

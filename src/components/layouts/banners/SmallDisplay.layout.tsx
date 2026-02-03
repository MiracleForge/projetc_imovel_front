import Image, { ImageProps } from 'next/image';

interface SmallDisplayProps extends Omit<ImageProps, 'fill'> {
}

const SmallDisplay = ({ src, alt, ...rest }: SmallDisplayProps) => {
  return (
    <div className="relative w-40 lg:w-56 aspect-video overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-lg hover:scale-110 transition-transform"
        {...rest}
      />
    </div>
  );
};

export default SmallDisplay;

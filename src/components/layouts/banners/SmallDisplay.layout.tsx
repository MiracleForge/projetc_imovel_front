import Image, { ImageProps } from 'next/image';

interface SmallDisplayProps extends Omit<ImageProps, 'fill'> {
}

const SmallDisplay = ({ src, alt, ...rest }: SmallDisplayProps) => {
  return (
    <div className={`min-h-[10vh] relative group cursor-pointer overflow-hidden rounded-lg w-40 lg:w-56 hover:scale-110 transition-transform duration-300 ease-in-out`}>
      <Image
        src={src}
        alt={alt}
        className={` object-cover rounded-lg`}
        fill
        sizes="(max-width: 768px) 25vw, 12.5vw"
        {...rest}
      />
    </div>
  );
};

export default SmallDisplay;

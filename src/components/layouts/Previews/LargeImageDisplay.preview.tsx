import Image, { ImageProps } from 'next/image';

const LargeDisplay = ({ src, alt, ...props }: ImageProps) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg aspect-video">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-lg hover:scale-110 transition-transform"
        {...props}
      />
    </div>
  );
};
export default LargeDisplay;


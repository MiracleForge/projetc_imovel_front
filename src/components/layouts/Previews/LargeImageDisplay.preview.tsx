import Image, { ImageProps } from 'next/image';

const LargeDisplay = ({ src, alt, ...props }: ImageProps) => {
  return (
    <div className="group relative w-full h-full overflow-hidden rounded-lg aspect-video">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-lg hover:scale-110 transition-transform"
        {...props}
      />

      <img src={"/miscellaneous/expandir-area.svg"} width={16} height={16} alt='' className='absolute size-12 origin-top-right right-2 top-6 bg-white/20 rounded-lg group-hover:scale-105 p-2' />
    </div>
  );
};
export default LargeDisplay;


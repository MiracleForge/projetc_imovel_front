import Image, { ImageProps } from 'next/image';

interface SmallDisplayProps extends Omit<ImageProps, 'fill'> {
  isFullScreen?: boolean;
}
const SmallDisplay = ({ isFullScreen, src, alt, ...rest }: SmallDisplayProps) => {
  return (
    <figure className={`${isFullScreen ? 'min-h-full' : 'min-h-[10vh]'} relative group cursor-pointer overflow-hidden rounded-lg w-40 lg:w-56`}>
      <div className={`${!isFullScreen && 'group-hover:bg-black/20'} bg-transparent transition-colors duration-300 absolute origin-bottom-left h-full w-full z-20 rounded-lg`}>
        {/* TODO: MAGNIFYGLASS SVG */}
      </div>
      <Image
        src={src}
        alt={alt}
        className={`${!isFullScreen && 'group-hover:scale-110 transition-transform duration-300 ease-in-out'} object-cover rounded-lg`}
        fill
        sizes="(max-width: 768px) 25vw, 12.5vw"
        {...rest}
      />
    </figure>
  );
};

export default SmallDisplay;
// {!isFullScreen &&
//     // <FaMagnifyingGlass className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse size-6 text-transparent group-hover:text-white" />
// }
//

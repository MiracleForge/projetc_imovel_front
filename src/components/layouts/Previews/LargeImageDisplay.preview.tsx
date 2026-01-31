import Image, { ImageProps } from 'next/image';

const LargeDisplay = ({
  src = '', // Colocar uma url para um placeholder, pode ser local ou da internet
  alt = 'Imagem padrão',
  ...props
}: ImageProps): React.JSX.Element => {

  return (
    <div
      id='Big Figure'
      className="relative w-full aspect-video md:aspect-auto  h-full overflow-hidden rounded-lg"
    >
      <Image
        src={src}
        alt={alt}
        {...props}
        className='object-cover rounded-lg hover:scale-110 transition-transform duration-300 ease-in-out'
        fill
        sizes='(max-width: 768px) 100vw, 50vw'
      />
    </div>

  );
};

export default LargeDisplay;


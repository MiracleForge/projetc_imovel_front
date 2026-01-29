'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';

const LargeDisplay = ({
  src = '', // Colocar uma url para um placeholder, pode ser local ou da internet
  alt = 'Imagem padrão',
  ...props
}: ImageProps): React.JSX.Element => {
  const [isImageOpen, setImageOpen] = useState<boolean>(false);

  const handleOpenImage = useCallback((): void => {
    setImageOpen(true);
  }, []);

  const handleCloseImage = useCallback((): void => {
    setImageOpen(false);
  }, []);

  const handleEscPress = useCallback((event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      handleCloseImage();
    }
  }, [handleCloseImage]);

  useEffect(() => {
    if (isImageOpen) {
      window.addEventListener('keydown', handleEscPress);
    } else {
      window.removeEventListener('keydown', handleEscPress);
    }

    return () => {
      window.removeEventListener('keydown', handleEscPress);
    };
  }, [isImageOpen, handleEscPress]);

  const containerClasses = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-40 -top-8';

  return (
    <>
      <div
        id='Big Figure'
        onClick={handleOpenImage}
        className="relative w-full aspect-video md:aspect-auto h-full overflow-hidden rounded-lg"
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

      {isImageOpen && (
        <div
          className={containerClasses}
          onClick={handleCloseImage}
        >

          <div className="relative w-3/4 h-3/4">
            <Image
              src={src}
              className='object-cover rounded-lg'
              alt={alt}
              fill
              sizes='(max-width: 768px) 100vw, 75vw'
            />
          </div>

        </div>
      )}
    </>
  );
};

export default LargeDisplay;


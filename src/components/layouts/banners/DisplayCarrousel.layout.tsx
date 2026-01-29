'use client'
import React, { useState, useCallback, ReactNode } from 'react';

interface CarrouselProps {
  children: ReactNode;
  container?: string;
  imageContainer?: string;
  imageStyle?: string;
}

const CarrouselDisplay = ({ children, container = '', imageContainer = '', imageStyle = '' }: CarrouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const items = React.Children.toArray(children);
  const totalItems = items.length;

  const handlePrevClick = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const handleNextClick = useCallback(() => {
    if (isOpen) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    } else {
      setCurrentIndex((prevIndex) => {
        if (prevIndex + 1 < totalItems) {
          return prevIndex + 1;
        } else {
          return 0;
        }
      });
    }
  }, [totalItems, isOpen]);

  const handleOpenFullScreen = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const handleCloseFullScreen = useCallback(() => {
    setIsOpen(false);
    // Resetar o índice quando sair do fullscreen
    setCurrentIndex(0);
  }, []);

  return (
    <>
      <div className={`${container} relative`}>
        <div className={imageContainer}>
          {items.slice(currentIndex, currentIndex + 4).map((item, index) => (
            <div
              key={index}
              className={imageStyle}
              onClick={() => handleOpenFullScreen(currentIndex + index)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-40 -top-10">
          <button
            type="button"
            className="absolute top-10 right-4 transform shadow-md text-black rounded-full hover:bg-gray-200"
            onClick={handleCloseFullScreen}
          >
          </button>
          <div className="relative w-3/4 h-3/4 overflow-auto">
            {React.cloneElement(items[currentIndex] as React.ReactElement<any>, {
              isFullScreen: true,
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(CarrouselDisplay);


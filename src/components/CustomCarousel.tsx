'use client';

import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef
} from 'react';
import Slider, { Settings } from 'react-slick';
import { IconContext } from 'react-icons';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

/* -------------------------------------------------- */
/* types                                              */
/* -------------------------------------------------- */

type ArrowPos =
  | 'top-left' | 'top-center' | 'top-right'
  | 'center-left' | 'center' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

/** What parents can call when they hold a ref */
export interface CustomCarouselHandle {
  slickNext: () => void;
  slickPrev: () => void;
  slickGoTo: (index: number) => void;
}

export interface CustomCarouselProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
  slidesToShow?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  infinite?: boolean;
  dots?: boolean;
  arrows?: boolean;
  arrowPosition?: ArrowPos;
  className?: string;
}

/* -------------------------------------------------- */
/* helpers                                            */
/* -------------------------------------------------- */

const posClasses: Record<ArrowPos, string> = {
  'top-left': 'top-2 left-2',
  'top-center': 'top-2 left-1/2 -translate-x-1/2',
  'top-right': 'top-2 right-2',
  'center-left': 'top-1/2 -translate-y-1/2 left-2',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'center-right': 'top-1/2 -translate-y-1/2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-center': 'bottom-2 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-2 right-2'
};

interface ArrowProps {
  onClick?: () => void;
  dir: 'prev' | 'next';
  position: ArrowPos;
}

const Arrow: React.FC<ArrowProps> = ({ onClick, dir, position }) => (
  <button
    onClick={onClick}
    className={`absolute ${posClasses[position]} z-20 flex h-10 w-10 items-center justify-center rounded-full
                bg-white/80 backdrop-blur-lg shadow-md hover:bg-white`}
    aria-label={dir === 'prev' ? 'Previous slide' : 'Next slide'}
  >
    <IconContext.Provider value={{ size: '1.25rem' }}>
      {dir === 'prev' ? <IoChevronBack /> : <IoChevronForward />}
    </IconContext.Provider>
  </button>
);

/* -------------------------------------------------- */
/* main component                                     */
/* -------------------------------------------------- */

const CustomCarousel = forwardRef<CustomCarouselHandle, CustomCarouselProps>(
  (
    {
      header,
      footer,
      children,
      slidesToShow = 1,
      autoplay = false,
      autoplayInterval = 4000,
      infinite = true,
      dots = true,
      arrows = true,
      arrowPosition = 'center-right',
      className
    },
    ref: Ref<CustomCarouselHandle>
  ) => {
    const internalRef = useRef<Slider>(null);

    /* expose Slick’s imperative API to parent components */
    useImperativeHandle(ref, () => ({
      slickNext: () => internalRef.current?.slickNext(),
      slickPrev: () => internalRef.current?.slickPrev(),
      slickGoTo: (index: number) => internalRef.current?.slickGoTo(index, true)
    }));

    const settings: Settings = {
      slidesToShow,
      slidesToScroll: 1,
      autoplay,
      autoplaySpeed: autoplayInterval,
      infinite,
      dots,
      arrows,
      adaptiveHeight: true,
      ...(arrows && {
        nextArrow: <Arrow dir="next" position={arrowPosition} />,
        prevArrow: <Arrow dir="prev" position={arrowPosition} />
      })
    };

    return (
      <div className={`relative w-full ${className ?? ''}`}>
        {header && <div className="mb-4">{header}</div>}

        <Slider ref={internalRef} {...settings}>
          {children}
        </Slider>

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    );
  }
);

CustomCarousel.displayName = 'CustomCarousel';

export default CustomCarousel;

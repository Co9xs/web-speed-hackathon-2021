import React from 'react';
import { useInView } from 'react-intersection-observer';

import { classNames } from '../../../utils/classnames';
import { getImagePath } from '../../../utils/get_path';
import { AspectRatioBox } from '../../foundation/AspectRatioBox';

/**
 * @typedef {object} Props
 * @property {Array<Models.Image>} images
 */

/** @type {React.VFC<Props>} */
const ImageArea = ({ images }) => {
  const {ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });
  return (
    <AspectRatioBox aspectHeight={9} aspectWidth={16}>
      <div ref={ref} className="grid gap-1 grid-cols-2 grid-rows-2 w-full h-full border border-gray-300 rounded-lg overflow-hidden">
        {images.map((image, idx) => {
          return (
            <div
              key={image.id}
              // CSS Grid で表示領域を指定する
              className={
                classNames(
                  'bg-gray-300',
                  images.length !== 1 ? 'col-span-1' : '',
                  images.length === 1 ? 'col-span-2' : '',
                  images.length > 2 && (images.length !== 3 || idx !== 0) ? 'row-span-1' : '',
                  images.length <= 2 || (images.length === 3 && idx === 0) ? 'row-span-2' : '',
                )
              }
            >
              {inView ? (
                <img 
                  src={getImagePath(image.id)}
                  alt={image.alt}
                  className='w-full h-full object-cover'
                  loading='lazy'
                />
              ): null}
            </div>
          );
        })}
      </div>
    </AspectRatioBox>
  );
};

export { ImageArea };

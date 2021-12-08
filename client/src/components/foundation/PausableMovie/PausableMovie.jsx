import { useRef, useState, useEffect, useCallback } from 'react';
import { AspectRatioBox } from '../AspectRatioBox';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { classNames } from '../../../utils/classnames';

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = ({ src }) => {
  /** @type {React.RefObject<HTMLVideoElement>} */
  const videoRef = useRef(null);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPlaying(false);
      videoRef.current?.pause();
    } else {
      setIsPlaying(true);
      videoRef.current?.play();
    }
  }, [prefersReducedMotion, videoRef])

  const handleClick = useCallback(() => {
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        videoRef.current?.pause();
      } else {
        videoRef.current?.play();
      }
      return !isPlaying;
    });
  }, []);

  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1}>
      <button className="group relative block w-full h-full" onClick={handleClick} type="button">
        <video
          ref={videoRef}
          muted
          src={src}
          autoPlay={prefersReducedMotion}
          loop
          playsInline
          className="w-full"
        />
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2',
            isPlaying ? 'opacity-0 group-hover:opacity-100' : null
          )}
        >
          <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
        </div>
      </button>
    </AspectRatioBox>
  );
};

export { PausableMovie };

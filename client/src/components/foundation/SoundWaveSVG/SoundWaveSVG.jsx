/**
 * @typedef {object} Props
 * @property {ArrayBuffer} soundData
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ soundId }) => {
  return (
    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
      <use xlinkHref={`/images/waves/${soundId}.svg`} />
    </svg>
  );
};

export { SoundWaveSVG };

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} soundData
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ soundId }) => {
  return (
    <img style={{ width: '100%', height: '100%' }} src={`/images/waves/${soundId}.svg`} loading="lazy" />
  );
};

export { SoundWaveSVG };

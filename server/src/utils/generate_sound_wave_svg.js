import { AudioContext } from 'web-audio-api';
import { zip, mean, chunk } from './util_func';

/**
 * @param {ArrayBuffer} data
 * @returns {Promise<{ max: number, peaks: number[] }}
 */
 async function calculate(data) {
  const audioCtx = new AudioContext();
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(data.slice(0), resolve, reject)
  })
  const leftData = buffer.getChannelData(0).map(d => Math.abs(d))
  const rightData = buffer.getChannelData(1).map(d => Math.abs(d))
  const normalized = zip(leftData, rightData).map(arr => mean(arr))
  const chunks = chunk(normalized, Math.ceil(normalized.length / 100));
  const peaks = chunks.map(chunk => mean(chunk))
  const max = Math.max(...peaks)
  return { max, peaks }
}

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} buffer
 */

/**
 * @type {React.VFC<Props>}
 */
async function generateSoundWaveSvg(soundData) {
  const { peaks, max } = await calculate(soundData);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 1">
      ${peaks.map((peak, i) => {
        const ratio = peak / max;
        return `<rect key="${i}" fill="#2563EB" height="${ratio}" width="1" x="${i}" y="${1 - ratio}" />`;
      })}
    </svg>
  `.trim();
};

export { generateSoundWaveSvg };
import React from 'react';
import { zip, mean, chunk } from '../../../utils/utilFunc';

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
 * @property {ArrayBuffer} soundData
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ soundData }) => {
  const uniqueIdRef = React.useRef(Math.random().toString(16));
  const [{ max, peaks }, setPeaks] = React.useState({ max: 0, peaks: [] });

  React.useEffect(() => {
    calculate(soundData).then(({ max, peaks }) => {
      setPeaks({ max, peaks });
    });
  }, [soundData]);

  return (
    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
      {peaks.map((peak, idx) => {
        const ratio = peak / max;
        return (
          <rect key={`${uniqueIdRef.current}#${idx}`} fill="#2563EB" height={ratio} width="1" x={idx} y={1 - ratio} />
        );
      })}
    </svg>
  );
};

export { SoundWaveSVG };

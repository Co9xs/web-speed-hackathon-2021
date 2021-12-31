import fs from 'node:fs/promises';
import path from 'path';
import { AudioContext } from 'web-audio-api';
import { globby } from "globby";

async function calculate(data) {
  const audioCtx = new AudioContext();
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(data.slice(0), resolve, reject)
  })
  const leftData = buffer.getChannelData(0)
  const rightData = buffer.getChannelData(1)
  const dataLength = leftData.length;
  const chunkLength = Math.ceil(dataLength / 100);
  let peaks = [];
  let max = 0;
  let temp = 0;
  let count = 0;
  for (let i = 0; i < dataLength; i++) {
    temp += (Math.abs(leftData[i]) + Math.abs(rightData[i])) / 2;
    count++;
    if (count === chunkLength) {
      const peak = temp / chunkLength;
      peaks.push(peak);
      max = Math.max(max, peak);
      temp = 0;
      count = 0;
    }
  }
  return { max, peaks }
}

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

const generateSvg = async () => {
	const soundPaths = await globby(`../../../../public/sounds/mp3/*.mp3`);
	for (const soundPath of soundPaths) {
    console.log(`generating svg from sound data at ${soundPath}`)
		const buffer = await fs.readFile(soundPath);
		const svgString = await generateSoundWaveSvg(buffer);
    const soundId = path.basename(soundPath, '.mp3');
    const newPath = `../../../../public/images/waves/${soundId}.svg`
		await fs.writeFile(newPath, svgString);
		console.log(`svg generated at ${newPath}!`)
	}
}

generateSvg();
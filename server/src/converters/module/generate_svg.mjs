import fs from 'node:fs/promises';
import { globby } from "globby";
import { generateSoundWaveSvg } from "../../utils/generate_sound_wave_svg.js";
import path from 'path';

/**
 * @param {string} from
 * @param {string} to
 * @returns {void}
 */
const generateSvg = async () => {
	const soundPaths = await globby(`../../../../public/sounds/*.m4a`);
	for (const soundPath of soundPaths) {
    const soundId = path.basename(soundPath, '.m4a');
		const buffer = await fs.readFile(soundPath);
		const svgString = await generateSoundWaveSvg(buffer);
    const newPath = `../../../../public/images/waves/${soundId}.svg`
		await fs.writeFile(newPath, svgString);
		console.log(newPath, `svg generated`)
	}
}

generateSvg();
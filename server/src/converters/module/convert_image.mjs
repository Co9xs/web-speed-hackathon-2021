import fs from 'node:fs/promises';
import sharp from 'sharp';
import { globby } from "globby";

/**
 * @param {Buffer} buffer
 * @param {string} extension
 * @returns {Promise<Buffer>}
 */
const convertBuffer = (buffer, extension) => {
	switch (extension) {
		case 'avif':
			return sharp(buffer).avif({speed: 1}).toBuffer();
		case 'webp':
			return sharp(buffer).webp().toBuffer();
		default:
			return sharp(buffer).webp().toBuffer();
	}
}

/**
 * @param {string} from
 * @param {string} to
 * @returns {void}
 */
const convertImage = async (from, to) => {
	const imagePaths = await globby(`../../../../public/images/**/*.${from}`);
	for (const path of imagePaths) {
		const buffer = await fs.readFile(path);
		const converted = await convertBuffer(buffer, to);
		await fs.writeFile(path.replace(`.${from}`, `.${to}`), converted);
		console.log(path.replace(`.${from}`, `.${to}`), `convert completed`)
	}
}

convertImage("webp", "avif");
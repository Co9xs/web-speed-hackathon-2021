import { globby } from "globby";
import fs from 'node:fs/promises';
import sharp from "sharp";

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @param {number} [options.height]
 * @param {number} [options.width]
 * @returns {Promise<Uint8Array>}
 */
const resizeImage = async (buffer, options) => {
    return sharp(buffer)
        .resize({
            fit: "cover",
            height: options.height,
            width: options.width,
            withoutEnlargement: true
        })
        .toBuffer();
}

const main = async () => {
	const imagePaths = await globby("../../../../public/images/**/*.webp");
	for (const path of imagePaths) {
		const buffer = await fs.readFile(path);
		const resizedBuffer = await resizeImage(buffer, {
      height: 1080
    });
		await fs.writeFile(path, resizedBuffer);
		console.log(path, `resize completed`)
	}
}

main();
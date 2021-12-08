import { globby } from "globby";
import fs from 'node:fs/promises';
import sharp from "sharp";

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @param {number} [options.height]
 * @param {number} [options.width]
 * @returns {Promise<Buffer>}
 */
const resizeBuffer = async (buffer, options) => {
    return sharp(buffer)
        .resize({
            fit: "cover",
            height: options.height,
            width: options.width,
            withoutEnlargement: true
        })
        .toBuffer();
}

const SEARCH_TARGET_EXTENSION = 'avif';

/**
 * @returns {void}
 */
const resizeImage = async () => {
	const imagePaths = await globby(`../../../../public/images/*.${SEARCH_TARGET_EXTENSION}`);
	for (const path of imagePaths) {
		const buffer = await fs.readFile(path);
		const resizedBuffer = await resizeBuffer(buffer, {
      height: 1080
    });
		await fs.writeFile(path, resizedBuffer);
		console.log(path, 'resize completed')
	}
}

const resizeProfileImage = async () => {
  const profileImagePaths = await globby(`../../../../public/images/profiles/*.${SEARCH_TARGET_EXTENSION}`);
  for (const path of profileImagePaths) {
    const buffer = await fs.readFile(path);
    const resizedBuffer = await resizeBuffer(buffer, {
      height: 126
    });
    await fs.writeFile(path, resizedBuffer);
    console.log(path, 'resize completed')
  }
}

resizeImage();
resizeProfileImage();
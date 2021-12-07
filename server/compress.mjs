import fs from 'node:fs/promises';
import sharp from 'sharp';
import { globby } from "globby";

const convertToWebp = (buffer) => {
	return sharp(buffer).webp().toBuffer();
}

(async () => {
	const imagePaths = await globby("../public/images/**/*.jpg");
	for (const path of imagePaths) {
		const buffer = await fs.readFile(path);
		const converted = await convertToWebp(buffer);
		const newPath = `${path.slice(0, -4)}.webp`
		await fs.writeFile(path, converted);
		await fs.rename(path, newPath)
		console.log(newPath, `convert completed`)
	}
})();
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { globby } from "globby";

const convertToAvif = async (buffer) => {
	return sharp(buffer).avif({speed: 9}).toBuffer();
}

const main = async () => {
	const imagePaths = await globby("../../../../public/images/**/*.jpg");
	for (const path of imagePaths) {
		const buffer = await fs.readFile(path);
		const converted = await convertToAvif(buffer);
		const newPath = `${path.slice(0, -4)}.avif`
		await fs.writeFile(path, converted);
		await fs.rename(path, newPath)
		console.log(newPath, `convert completed`)
	}
}

main();
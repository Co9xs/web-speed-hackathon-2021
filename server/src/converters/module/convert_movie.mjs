import { globby } from "globby";
import ffmpeg from 'fluent-ffmpeg';

/**
 * @returns {void}
 */
const convertMovie = async (from, to) => {
  const moviePaths = await globby(`../../../../public/movies/*.${from}`);
  for (const path of moviePaths) {
    const newPath = path.replace(`.${from}`, `.${to}`);
    ffmpeg(path)
    .toFormat(to)
    .on('end', () => {
      console.log(newPath, 'convert completed');
    }).save(newPath)
  }
}

convertMovie("mp4", "webm");
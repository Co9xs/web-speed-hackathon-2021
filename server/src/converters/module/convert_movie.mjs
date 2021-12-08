import { globby } from "globby";
import ffmpeg from 'fluent-ffmpeg';

/**
 * @returns {void}
 */
const convertMovie = async () => {
  const moviePaths = await globby(`../../../../public/movies/*.gif`);
  for (const path of moviePaths) {
    const newPath = path.replace('.gif', '.webm');
    ffmpeg(path)
    .toFormat('webm')
    .on('end', () => {
      console.log(newPath, 'convert completed');
    }).save(newPath)
  }
}

convertMovie();
import { promises as fs } from 'fs';
import path from 'path';

import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

import { convertSound } from '../../converters/convert_sound';
import { UPLOAD_PATH } from '../../paths';
import { extractMetadataFromSound } from '../../utils/extract_metadata_from_sound';
import { generateSoundWaveSvg } from '../../utils/generate_sound_wave_svg';

// 変換した音声の拡張子
const EXTENSION = 'm4a';

const router = Router();

router.post('/sounds', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  const soundId = uuidv4();

  const { artist, title } = await extractMetadataFromSound(req.body);

  const converted = await convertSound(req.body, {
    // 音声の拡張子を指定する
    extension: EXTENSION,
  });

  const filePath = path.resolve(UPLOAD_PATH, `./sounds/${soundId}.${EXTENSION}`);
  const svgPath = path.resolve(UPLOAD_PATH, `./images/waves/${soundId}.svg`); 
  const soundWaveSvg = await generateSoundWaveSvg(converted);
  await Promise.all([
    fs.writeFile(filePath, converted),
    fs.writeFile(svgPath, soundWaveSvg)
  ])

  return res.status(200).type('application/json').send({ artist, id: soundId, title });
});

export { router as soundRouter };

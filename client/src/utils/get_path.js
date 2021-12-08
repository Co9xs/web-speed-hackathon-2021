import { Cloudinary } from '@cloudinary/url-gen';

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'fujishima'
  }
})

/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId) {
  const imageUrl = cloudinary.image(`hackathon-2021/images/${imageId}`).format("avif").toURL();
  return imageUrl;
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getMoviePath(movieId) {
  return `/movies/${movieId}.gif`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPath(soundId) {
  return `/sounds/${soundId}.mp3`;
}

/**
 * @param {string} profileImageId
 * @returns {string}
 */
function getProfileImagePath(profileImageId) {
  const imageUrl = cloudinary.image(`hackathon-2021/images/profiles/${profileImageId}`).format("avif").toURL();
  return imageUrl;
}

export { getImagePath, getMoviePath, getSoundPath, getProfileImagePath };

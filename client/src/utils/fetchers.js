import { gzip } from 'pako';

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/octet-stream'
    }
  });
  return await res.arrayBuffer();
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include'
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err)
  }
  return await res.json()
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Accept': 'application/json'
    },
    body: file,
  });
  return await res.json();
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);
  const uint8Array = new TextEncoder().encode(jsonString);
  const compressed = gzip(uint8Array);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: compressed
  })
  return await res.json();
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };

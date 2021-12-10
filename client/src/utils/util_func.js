/**
 * @param {Date} date
 * @returns {string}
 */
function formatDate (date) {
  return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
}

/**
 * @param {any[][]} arrays
 * @returns {any[][]}
 */
 function zip(...arrays) { 
  const longestArray = arrays.reduce((prev, cur) => (cur.length > prev.length) ? cur : prev );
  const result = [];
  for (let i = 0; i < longestArray.length; i++) { 
    const items = [];
    for (let j = 0; j < arrays.length; j++) { 
      items.push(arrays[j][i]); 
    } 
    result.push(items); 
  } 
  return result; 
}

/**
 * @param {number[]} array
 * @returns {number}
 */
function mean(array) {
  return (array.reduce((prev, cur) => prev + cur)) / array.length
}

/**
 * @param {any[]} array
 * @param {number} size
 * @returns {any[][]}
 */
 function chunk(items, size) {
  const res = [];
  for (let i=0; i<items.length; i=i+size) {
    res.push(items.slice(i, i+size));
  }
  return size === 0 ? [] : res;
}

export { formatDate, zip, mean, chunk }
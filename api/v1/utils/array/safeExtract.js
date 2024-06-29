/**
 * Given the array this function returns its first entry
 * @param {*} array
 * @returns
 */
module.exports = (array) => {
  let val = array;

  if (Array.isArray(array)) {
    val = array[0];
  }
  return val;
};

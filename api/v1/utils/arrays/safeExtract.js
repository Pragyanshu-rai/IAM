/**
 * Given the array this function returns its first entry
 * @param {*} array
 * @returns
 */
export default (array) => {
  let val = array;

  if (Array.isArray(array)) {
    val = array[0];
  }
  return val;
};

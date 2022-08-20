/**
 * Given the error, location, statusCode and the message this function returns 
 * the error with the new set of values if any old values did not exist.
 * @param {*} error 
 * @param {*} loc 
 * @param {*} statusCode 
 * @param {*} message 
 * @returns 
 */
module.exports = (error, loc, statusCode, message) => {
  error.loc = error.loc || LOC;
  error.status = error.status || 500;
  error.message = (error.message !== undefined) ? error.message : ERROR_MESSAGE;
  return error;
};
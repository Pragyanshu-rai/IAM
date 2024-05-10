/**
 * Given the error, location, statusCode and the message this function returns 
 * the error with the new set of values if any old values did not exist.
 * @param {*} error 
 * @param {*} loc 
 * @param {*} statusCode 
 * @param {*} message 
 * @returns 
 */
module.exports = (error, LOC, statusCode, message) => {
  error.loc = error.loc || LOC || "SERVER";
  error.status = error.status || statusCode || 500;
  error.message = error.message || message || "Internal Server Error";
  return error;
};
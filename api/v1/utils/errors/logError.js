/**
 * This function is used to log the error to the console
 * @param {*} error
 */
module.exports = (error) => {
  const loc = error.loc || "SERVER";
  console.log(`${loc} ERROR - `, error);
  console.log(error.stack);
  console.log(error.name);
  console.log(error.code);
  console.log(error.message);
};

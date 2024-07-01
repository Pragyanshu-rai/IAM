const loginService = require("../service/loginService");
const generateTokenService = require("./generateTokenService");

const LOC = "Reset Password Service";
const DEBUG = parseInt(process.env.IN_DEV);

/**
 * Given the auth status this function will either return a token
 * or send an email with password reset link
 * @param {*} req 
 * @param {*} res 
 */
module.exports = async (req, res)  => {

  try {
    let response;
    
    // if the user is authenticated that means the request
    // must contain the userData object
    if (req.userData != null && req.userData != undefined) {
      req.body.email = req.userData.email;
      response = await loginService(req, res);
    } else {
      response = await generateTokenService(req, res);
    }
    return response;
  } catch (error) {
    error.loc = error.loc || LOC;
    error.status = error.status || 500;
    const defaultMessage = "Token Generation Error!";

    if (DEBUG) {
      error.message = (error.message !== undefined && error.message !== "") ? error.message : defaultMessage;
    } else {
      error.message = defaultMessage;
    }
    throw error;
  }
};
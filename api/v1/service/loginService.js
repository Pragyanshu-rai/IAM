const UserModel = require('../models/user.model');

const logError = require("../utils/error/logError");
const createRSAToken = require("../utils/security/token/createRSAToken");

const SECRET_KEY = process.env.JWT_KEY;
const DEBUG = parseInt(process.env.IN_DEV);

/**
 * This function will log the user in and return the auth token if the
 * authentication is successful
 * @param {*} req 
 * @param {*} res 
 * @returns res
 */
module.exports = async (req, res) => {

  try {
    const password = req.body.password;
    const userModel = new UserModel(req.body);
    const user_data = await userModel.login(password);
    const auth_token = createRSAToken(
      {
        email: userModel.user.email,
        data: user_data
      },
      SECRET_KEY,
      {
        expiresIn: '1h'
      }
    );

    return res.status(200).json({
      message: "Login Successful!",
      authToken: `Token ${auth_token}`
    });
  } catch (error) {
    error.loc = error.loc || LOC;
    error.status = error.status || 500;
    const defaultMessage = "Token Generation Error!";

    if (DEBUG) {
      error.message = (error.message !== undefined && error.message !== "") ? error.message : defaultMessage;
      logError(error);
    } else {
      error.message = defaultMessage;
    }
    throw error;
  }
};
const UserModel = require("../models/user.model");

const capitalizeAll = require("../utils/string/capitalizeAll");
const generateLink = require("../utils/network/url/generateURL");
const sendResetEmail = require("../utils/network/mail/sendCodeEmail");
const getSecureString = require("../utils/security/cipher/randomSecure");

const LOC = "Generate Token Service";
const DEBUG = parseInt(process.env.IN_DEV);

/**
 * Given the req, and res object this function will generate a token, 
 * register it against the user and will send out an email if the
 * userExists
 * @param {*} req 
 * @param {*} res 
 * @returns res
 */
module.exports = async (req, res) => {

  try {
    const email = req.body.email;

    // generate the random secure string of length 25 bytes
    const token = getSecureString(25, true);

    // find the user and save the randomToken
    const userData = await UserModel.findByEmail(email);

    // throw an error if the user is not registered
    if (userData == undefined || userData == null) {
      throw new Error("User Not Found");
    }
    await UserModel.saveRandomToken(userData.id, token);
    const resetURL = generateLink(req, userData.id, token);
    const now = new Date();
    const fullName = UserModel.fullName(userData);
    await sendResetEmail(email, capitalizeAll(fullName), resetURL, now.toUTCString());

    return res.status(201).json({
      message: "Email Sent Successfully!",
      resetLink: resetURL
    });
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
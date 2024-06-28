const UserModel = require("../models/user.model");

const sendResetEmail = require("../utils/network/mail/sendCodeEmail");
const createRSAToken = require("../utils/security/token/createRSAToken");
const getSecureString = require("../utils/security/cipher/randomSecure");

const LOC = "Generate Token Service";
const SECRET_KEY = process.env.JWT_KEY;

/**
 * Given the req object, userId and the token this function will 
 * generate a dynamic link with the provided token
 * @param {*} req 
 * @param {*} userId 
 * @param {*} token 
 * @returns url
 */
const generateLink = (req, userId, token) => {
  const resetURL = `${req.protocol}://${req.get("host")}/user/reset-password-request/${userId}/true/${token}`;

  return resetURL;
};

/**
 * Given the req, and res object this function will generate a token
 * , register it against the user and will send out an email if the
 * userExists
 * @param {*} req 
 * @param {*} res 
 * @returns res
 */
module.exports = async (req, res) => {

  try {
    const email = req.body.email;
    const token = getSecureString(25, true);
    const user = await UserModel.findByEmail(email);
    await UserModel.saveRandomToken(user.id, token);
    const resetURL = generateLink(req, user.id, token);
    const now = new Date();
    await sendResetEmail(email, user.first_name, resetURL, now.toUTCString());
    const authToken = createRSAToken(
      {
        email: email,
        data: user
      },
      SECRET_KEY,
      {
        expiresIn: '10m'
      }
    );

    return res.status(201).json({
      message: "Email Sent Successfully!",
      authToken: `Token ${authToken}`
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
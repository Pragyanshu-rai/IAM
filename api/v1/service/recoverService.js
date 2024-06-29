const UserModel = require("../models/user.model");

const updatePasswordService = require("./updatePasswordService");
const verifyToken = require("../utils/security/token/verifyToken");

const LOC = "Recover Password Service";
const SECRET_KEY = process.env.JWT_KEY;

/**
 * This function will determine whether to updateThePasswordDirectly
 * @param {*} req 
 * @param {*} res 
 * @returns res
 */
module.exports = async (req, res) => {
  
  try {
    const params = req.params;

    if (params["forgot"].toLowerCase() === "true") {
      const userId = params["id"];
      const token = params["token"];
      req.userData = {
        data: {
          id: userId
        }
      };
      const registeredToken = await UserModel.ifTokenExists(token, true);
      
      if (registeredToken == null || registeredToken == undefined || registeredToken.reset_token != token) {
        throw new Error("Invalid Token!");
      }
      await UserModel.invalidateToken(userId);
    } 
    // else {
    //   const jwtToken = req.headers.authorization.split(" ")[1];
    //   const tokenData = verifyToken(jwtToken, SECRET_KEY);
    //   req.userData = tokenData;
    // }
    return await updatePasswordService(req, res);
  } catch (error) {
    error.loc = error.loc || LOC;
    throw error;
  }
};
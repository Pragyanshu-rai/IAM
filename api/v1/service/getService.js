const UserModel = require('../models/user.model');
const MultipleUserModel = require('../models/multiple-user.model');

const VERIFIER = require("../utils/rules/roles").VERIFIER;

/**
 * Getting multiple users from the database
 * @param {*} req 
 * @param {*} res 
 * @returns res
 */
module.exports = async (req, res) => {
  let users = new Array();
  const authorizedBy = {
    id: req.userData.data.id
  };

  if (!req.query.ids && !req.payload) {
    const error = new Error("Query Param 'ids' missing!");
    error.status = 400;
    throw error;
  }

  if (req.payload?.data && (req.userData.data.id !== req.payload.data.id)) {
    await UserModel.roleInOrError(authorizedBy, VERIFIER);
  }

  if (req.payload.data.id) {
    users = await UserModel.findOne(req.payload.data.id);
  } else if (req.query.ids?.length >= 1) {
    const userIds = req.query.ids.split(',');
    const multipleUserModel = new MultipleUserModel(req.body, userIds);
    users = await multipleUserModel.getMultipleUsers();
  }
  
  return res.status(200).json(users);
};
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');
const MultipleUserModel = require('../models/multiple-user.model');
const setError = require('../utils/errors/setError');

const LOC = "CONTROLLER";
const EDITOR = ['Admin', 'Staff'];
const VERIFIER = ['Admin', 'System'];
const SECRET_KEY = process.env.JWT_KEY;
const DEBUG = parseInt(process.env.IN_DEV);
const ERROR_MESSAGE = "Internal Server Error";

/**
 * This function will register the user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.userSignUp = async (req, res, next) => {
  const password = req.body.password;

  try {
    let actor = (req.body.role === 'System') ? 'App' : 'User';
    const authorizedBy = {
      id: req.headers.permissible
    };

    if (req.body.role !== 'User') {
      await UserModel.roleInOrError(authorizedBy, EDITOR);
    }
    const userModel = new UserModel(req.body);
    await userModel.register(password);

    if (req.body.role === 'System') {
      await UserModel.addUserSystemEntry(req.body.email, authorizedBy.id);
    }
    let response = await UserModel.findByEmail(userModel.user.email);

    if (response.date_of_birth) {
      response.date_of_birth = response.date_of_birth.toISOString().split('T')[0];
    }
    return res.status(201).json({
      message: `${actor} registered successfully`,
      details: response
    });

  } catch (error) {
    next(setError(error, LOC, 500, ERROR_MESSAGE));
  }
};

/**
 * This function will log the user in and return the auth token if the
 * authentication is successful
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.userLogin = async (req, res, next) => {
  const password = req.body.password;

  try {
    const userModel = new UserModel(req.body);
    const user_data = await userModel.login(password);
    const auth_token = jwt.sign(
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
    next(setError(error, LOC, 500, ERROR_MESSAGE));
  }
};

/**
 * This function is used to update the user details
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.updateUser = async (req, res, next) => {

  try {
    req.body.id = req.userData.data.id;
    let actor = (req.userData.data.role === 'System') ? 'App' : 'User';
    const permissibleRoles = new Array['System', 'Staff', 'Admin'];

    if (permissibleRoles.includes(req.body.role)) {
      const authorizedBy = {
        id: req.headers.permissible
      };
      await UserModel.roleIsOrError(authorizedBy, 'Admin');

      if (req.body.role === 'Admin') {
        delete req.body.role;
      }
    }
    const userModel = new UserModel(req.body);
    await userModel.update();
    const updatedUser = await UserModel.findOne(userModel.user.id);
    return res.status(200).json({
      message: `${actor} Data Update Successful!`,
      updatedUser: updatedUser
    });

  } catch (error) {
    next(setError(error, LOC, 500, ERROR_MESSAGE));
  }
};

/**
 * This function is used to update the user password
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.updatePassword = async (req, res, next) => {
  const password = req.body.password;

  try {
    req.body.id = req.userData.data.id;
    const userModel = new UserModel(req.body);
    await userModel.update(password);
    return res.status(201).json({
      message: "Password Change Successful!"
    });

  } catch (error) {
    next(setError(error, LOC, 500, ERROR_MESSAGE));
  }
};

/**
 * Getting multiple users from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getMultipleUsers = async (req, res, next) => {

  try {
    let users;
    req.body.id = req.headers.permissible;
    const authorizedBy = {
      id: req.body.id
    };
    await UserModel.roleInOrError(authorizedBy, VERIFIER);

    if (!req.query.ids) {
      const error = new Error("Query Param 'ids' missing!");
      error.status = 400;
      throw error;
    }

    if (req.query.ids.length < 1) {
      users = [];
    } else {
      const userIds = req.query.ids.split(',');
      const MultipleUserModel = new MultipleUserModel(req.body, userIds);
      users = await MultipleUserModel.getMultipleUsers();
    }
    return res.status(200).json(users);

  } catch (error) {
    next(setError(error, LOC, 500, ERROR_MESSAGE));
  }
};

/**
 * Deleting the users from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.deleteUser = async (req, res, next) => {

  try {
    const userIds = req.query.ids;
    req.body.id = req.userData.data.id;
    req.body.role = req.userData.data.role;
    let actor = (req.userData.data.role === 'System') ? 'App' : 'User';
    let response;

    if (req.body.role !== 'User') {
      let id;

      if (req.body.role !== 'System') {
        id = req.headers.permissible;
      } else {
        id = req.body.id;
      }
      const authorizedBy = {
        id: id
      };
      await UserModel.roleInOrError(authorizedBy, EDITOR);
    }

    if (userIds) {

      if (userIds.length < 1) {
        throw setError(new Error(), LOC, 400, "Cannot delete users, Ids not provided!");
      }
      const userIdArray = userIds.split(',');
      const multipleUserModel = new MultipleUserModel(req.body, userIdArray);
      await multipleUserModel.deleteMultipleUsers();
      response = {
        message: "Users Deleted!",
        user_id: userIds
      };
    } else {
      const user = new UserModel(req.body);
      await user.delete();
      response = {
        message: `${actor} Deleted!`,
        user_id: req.body.id
      };
    }
    return res.status(200).json(response);

  } catch (error) {
    next(setError(error, LOC, 500, ERROR_MESSAGE));
  }
};

/**
 * This function is used for authentication test for tokens
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.testAuth = async (req, res, next) => {

  try {
    req.userData.iat = new Date(req.userData.iat * 1000).toString();
    req.userData.exp = new Date(req.userData.exp * 1000).toString();
    return res.status(200).json({
      message: "Authentication Test Passed!",
      data: req.userData
    });

  } catch (error) {
    next(setError(error, LOC, 500, ERROR_MESSAGE));
  }
};
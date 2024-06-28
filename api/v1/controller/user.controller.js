// utils
const setError = require('../utils/errors/setError');

// services
const testService = require('../service/testService');
const loginService = require("../service/loginService");
const getUserService = require("../service/getService");
const deleteService = require("../service/deleteService");
const signUpService = require("../service/signupService");
const updateService = require("../service/updateService");
const updatePasswordService = require("../service/updatePasswordService");

const LOC = "CONTROLLER";
const ERROR_MESSAGE = "Internal Server Error";

/**
 * This function will invoke the signUpService function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns res
 */
exports.userSignUp = async (req, res, next) => {

  try {
    return await signUpService(req, res);
  } catch (error) {
    next(setError(error, LOC, 500, ERROR_MESSAGE));
  }
};

/**
 * This function will invoke the loginService function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.userLogin = async (req, res, next) => {

  try {
    return await loginService(req, res);
  } catch (error) {
    next(setError(error, LOC, 500, ERROR_MESSAGE));
  }
};

/**
 * This function will invoke the updateService function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.updateUser = async (req, res, next) => {

  try {
    return await updateService(req, res);
  } catch (error) {
    next(setError(error, LOC, 500, ERROR_MESSAGE));
  }
};

/**
 * This function will invoke the updatePasswordService function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.updatePassword = async (req, res, next) => {

  try {
    return await updatePasswordService(req, res);
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
    return await getUserService(req, res);
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
    return await deleteService(req, res);
  } catch (error) {
    next(setError(error, LOC, 500, ERROR_MESSAGE));
  }
};

/**
 * This function invokes the testService function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.testAuth = async (req, res, next) => {

  try {
    return await testService(req, res);
  } catch (error) {
    next(setError(error, LOC, 500, ERROR_MESSAGE));
  }
};
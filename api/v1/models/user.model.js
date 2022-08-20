const bcrypt = require('bcrypt');

const db = require('../../../config/db');
const UserClass = require('../classes/user.class');
const safeExtract = require('../utils/arrays/safeExtract');

const DEBUG = parseInt(process.env.IN_DEV);
const LOC = "DB MODEL";

class UserModel {

  constructor(user) {
    this.user = new UserClass(user);
  }

  /**
   * Given the password this method will register the user into the database
   * @param {*} password 
   */
  async register(password) {

    try {
      const userData = await UserModel.findByEmail(this.user.email);
      console.log("User Data", userData);

      if (DEBUG) {
        console.log("User Check", userData);
      }

      if (userData) {
        const error = new Error("Entry Already Exists!");
        error.status = 409;
        throw error;
      }
      const passwordHashed = await bcrypt.hash(password, 12);
      const registerUser = this.user.createRegistrationQuery(passwordHashed);
      const [users, _] = await db.execute(registerUser);
      const roleRegistration = this.user.createRoleRegistrationQuery();
      await db.execute(roleRegistration);

    } catch (error) {
      error.loc = error.loc || LOC;
      error.status = error.status || 422;
      const defaultMessage = "Could Not Register User!";

      if (DEBUG) {
        error.message = (error.message !== undefined && error.message !== "") ? error.message : defaultMessage;
      } else {
        error.message = defaultMessage;
      }
      throw error;
    }
  }

  /**
   * Given the password this function will log the user in and return an 
   * auth token.
   * @param {*} password 
   * @returns 
   */
  async login(password) {

    try {
      const validateUserQuery = this.user.createLoginQuery();
      const [users, _] = await db.execute(validateUserQuery);
      const user = safeExtract(users);

      if (user === undefined) {
        throw new Error();
      }
      const passwordHashed = user.password_hashed;
      user["authStatus"] = await bcrypt.compare(password, passwordHashed);
      delete user.password_hashed;
      this.user.id = user.id;
      const fetchUserRole = this.user.createFetchUserRoleQuery();
      const [roles, __] = await db.execute(fetchUserRole);
      const role = safeExtract(roles);
      user["role"] = role.role_name;

      if (!user.authStatus) {
        throw new Error();
      }
      return user;

    } catch (error) {
      error.loc = error.loc || LOC;
      error.status = error.status || 401;
      const defaultMessage = "Authentication Failed!";

      if (DEBUG) {
        error.message = (error.message !== undefined && error.message !== "") ? error.message : defaultMessage;
      } else {
        error.message = defaultMessage;
      }
      throw error;
    }
  }

  /**
   * This method can be called without arguments to update the user object
   * and with password to just update the password.
   * @param {*} password 
   */
  async update(password = undefined) {

    try {
      let userUpdateQuery;

      if (password === undefined) {
        userUpdateQuery = this.user.createUserUpdateQuery();
      } else {
        const passwordHashed = await bcrypt.hash(password, 12);
        userUpdateQuery = this.user.createUserUpdateQuery(passwordHashed);
      }
      await db.execute(userUpdateQuery);

      if (this.user.role) {
        const roleUpdateQuery = this.user.createRoleUpdateQuery();
        await db.execute(roleUpdateQuery);
      }

    } catch (error) {
      error.loc = error.loc || LOC;
      error.status = error.status || 422;
      const defaultMessage = "Failed To Update!";

      if (DEBUG) {
        error.message = (error.message !== undefined && error.message !== "") ? error.message : defaultMessage;
      } else {
        error.message = defaultMessage;
      }
      throw error;
    }
  }

  /**
   * This method when invoked will delete the user from the database
   */
  async delete() {

    try {
      const deleteUser = this.user.createDeleteUserQuery();
      await db.execute(deleteUser);

    } catch (error) {
      error.loc = error.loc || LOC;
      error.status = error.status || 409;
      const defaultMessage = "Failed To Delete!";

      if (DEBUG) {
        error.message = (error.message !== undefined && error.message !== "") ? error.message : defaultMessage;
      } else {
        error.message = defaultMessage;
      }
      throw error;
    }
  }

  /**
   * Given the user id this method will return the user object
   * @param {*} userId 
   * @returns 
   */
  static async findOne(userId) {
    const findQuery = UserClass.createFetchUserByIdQuery(userId);
    const [users, _] = await UserModel.safeExecute(findQuery);
    const user = safeExtract(users);
    return user;
  }

  /**
   * Given the email this method will return the user object
   * @param {*} email
   * @returns 
   */
  static async findByEmail(email) {
    const findQuery = UserClass.createFetchUserByEmailQuery(email);
    console.log("Query", findQuery);
    const [users, _] = await UserModel.safeExecute(findQuery);
    const user = safeExtract(users);
    console.log('Check', users);
    return user;
  }

  /**
   * Given the email and *attribute this method will return the user object
   * NOTE: * => optional
   * @param {*} email 
   * @param {*} attribute 
   * @returns 
   */
  static async getAttributeByEmail(email, attribute = 'id') {
    const findQuery = UserClass.createFetchUserAttributeByEmailQuery(email, attribute);
    const [users, _] = await UserModel.safeExecute(findQuery);
    const user = safeExtract(users);
    return user;
  }

  /**
   * Given the user email and the admin id this function will make an entry
   * in the user system table.
   * @param {*} email 
   * @param {*} adminId 
   */
  static async addUserSystemEntry(email, adminId) {
    const addQuery = UserClass.createUserSystemRegistrationQuery(email, adminId);
    await UserModel.safeExecute(addQuery);
  }

  /**
   * Given the execute query this method will return the db response
   * with builtin error handling
   * @param {*} executeQuery 
   * @returns 
   */
  static async safeExecute(executeQuery) {

    try {
      const [result, _] = await db.execute(executeQuery);
      return result;

    } catch (error) {
      error.loc = error.loc || LOC;
      error.status = error.status || 404;
      const defaultMessage = "Not Found!";

      if (DEBUG) {
        error.message = (error.message !== undefined && error.message !== "") ? error.message : defaultMessage;
      } else {
        error.message = defaultMessage;
      }
      throw error;
    }
  }

  /**
   * Given the user and target role this function will return true if the role
   * applies to the user
   * @param {*} user 
   * @param {*} targetRole 
   * @returns 
   */
  static async roleIs(user, targetRole) {
    const newUser = new UserClass(user);
    const getUserRole = newUser.createFetchUserRoleQuery();
    const [userRoles, _] = await db.execute(getUserRole);
    const userRole = safeExtract(userRoles);
    return (userRole.role_name === targetRole)
  }

  /**
   * Given the user and target role this function will return true if the role
   * applies to the user else it will throw an error
   * @param {*} user 
   * @param {*} targetRole 
   * @returns 
   */
  static async roleIsOrError(user, targetRole) {
    let rolesFit;
    try {
      rolesFit = await UserModel.roleIs(user, targetRole);

      if (!rolesFit) {
        const error = new Error();
        throw error;
      }
    } catch (error) {
      error.loc = error.loc || LOC;
      error.status = error.status || 403;
      const defaultMessage = "Permission Denied!";

      if (DEBUG) {
        error.message = (error.message !== undefined && error.message !== "") ? error.message : defaultMessage;
      } else {
        error.message = defaultMessage;
      }
      throw error;
    }
  }

  /**
   * Given the user and target role this function will return true if the role
   * exist in targetRoles
   * @param {*} user 
   * @param {*} targetRoles 
   * @returns 
   */
  static async roleIn(user, targetRoles) {
    const newUser = new UserClass(user);
    const getUserRole = newUser.createFetchUserRoleQuery();
    const [userRoles, _] = await db.execute(getUserRole);
    const userRole = safeExtract(userRoles);
    return targetRoles.includes(userRole.role_name);
  }

  /**
   * Given the user and target role this function will return true if the role
   * exist in targetRoles else it will throw an error 
   * @param {*} user 
   * @param {*} targetRoles 
   * @returns 
   */
  static async roleInOrError(user, targetRoles) {
    let rolesFit;
    try {
      rolesFit = await UserModel.roleIn(user, targetRoles);

      if (!rolesFit) {
        const error = new Error();
        throw error;
      }
    } catch (error) {
      error.loc = error.loc || LOC;
      error.status = error.status || 403;
      const defaultMessage = "Permission Denied!";

      if (DEBUG) {
        error.message = (error.message !== undefined && error.message !== "") ? error.message : defaultMessage;
      } else {
        error.message = defaultMessage;
      }
      throw error;
    }
  }
}

module.exports = UserModel;
const DBClass = require("../classes/user-mysql-db.class");

class UserClass {
  constructor(user) {
    this.id = user.id;
    this.first_name = user.first_name;
    this.middle_name = user.middle_name;
    this.last_name = user.last_name;
    this.date_of_birth = user.date_of_birth;
    this.gender = user.gender;
    this.email = user.email;
    this.mobile = user.mobile;
    this.role = user.role;
    this.DBClass = new DBClass();
  }

  // getters

  get fullName() {
    return `${this.first_name} ${(this.middle_name === "" || this.middle_name === null || this.middle_name === undefined) ? "" : this.middle_name} ${this.last_name}`;
  }

  //db methods

  /**
   * Given the password this method will return a user registration query
   * @param {*} password 
   * @returns 
   */
  createRegistrationQuery(password) {
    const registerUser = this.DBClass.createRegistrationQuery(password, this);
    return registerUser;
  }

  /**
   * This method when invoked will return the role registration query
   * @returns 
   */
  createRoleRegistrationQuery() {
    const roleRegistration = this.DBClass.createRoleRegistrationQuery(this);
    return roleRegistration;
  }

  /**
   * This method when invoked will return the query to fetch user Role 
   * @returns 
   */
  createFetchUserRoleQuery() {
    const fetchUserRole = this.DBClass.createFetchUserRoleQuery(this);
    return fetchUserRole;
  }

  /**
   * This method when invoked will return the login query
   * @returns 
   */
  createLoginQuery() {
    const validateUser = this.DBClass.createLoginQuery(this);
    return validateUser;
  }

  /**
   * This method when invoked will return the user update query
   * @returns 
   */
  createUserUpdateQuery(password = undefined) {
    const userUpdate = this.DBClass.createUserUpdateQuery(this, password);
    return userUpdate;
  }

  /**
   * This method when invoked will return the role update query
   * @returns 
   */
  createRoleUpdateQuery() {
    const roleUpdate = this.DBClass.createRoleUpdateQuery(this);
    return roleUpdate;
  }

  /**
   * This method when invoked will return the delete user query
   * @returns 
   */
  createDeleteUserQuery() {
    const deleteUser = this.DBClass.createDeleteUserQuery(this);
    return deleteUser;
  }

  /**
   * This method when invoked will return the user system registration query
   * @returns 
   */
  static createUserSystemRegistrationQuery(email, adminId) {
    const userSystemRegistration = DBClass.createUserSystemRegistrationQuery(email, adminId);
    return userSystemRegistration;
  }

  /**
   * This method when invoked will return the fetch user by id query
   * @returns 
   */
  static createFetchUserByIdQuery(userId) {
    const fetchUserById = DBClass.createFetchUserByIdQuery(userId);
    return fetchUserById;
  }

  /**
   * This method when invoked will return the query to fetch user details
   * using the email
   * @returns 
   */
  static createFetchUserByEmailQuery(email) {
    const fetchUserByEmail = DBClass.createFetchUserByEmailQuery(email);
    return fetchUserByEmail;
  }

  /**
   * This method when invoked will return the query to fetch user 
   * attributes by email
   * @returns 
   */
  static createFetchUserAttributeByEmailQuery(email, attribute = 'id') {
    const fetchUserAttributeByEmail = DBClass.createFetchUserAttributeByEmailQuery(email, attribute);
    return fetchUserAttributeByEmail;
  }
}

module.exports = UserClass;

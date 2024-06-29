const DEBUG = parseInt(process.env.IN_DEV);

class DBClass {

  constructor() {
  }

  /**
   * Given the user object and password this method will return a user registration query
   * @param {*} password 
   * @param {*} user 
   * @returns 
   */
  createRegistrationQuery(password, user) {
    const date_of_birth = (user.date_of_birth) ? `'${user.date_of_birth}'` : null;
    const middle_name = (user.middle_name === "" || user.middle_name === null || user.middle_name === undefined) ? null : `'${user.middle_name}'`;
    const registerUser = `
      INSERT INTO User (
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        gender,
        email,
        mobile,
        password_hashed
      )
      VALUES (
        '${user.first_name}',
        ${middle_name},
        '${user.last_name}',
        ${date_of_birth},
        (
          SELECT id
          FROM Gender
          WHERE Gender.gender = '${user.gender}'
        ),
        '${user.email}',
        '${user.mobile}',
        '${password}'
      );
    `;
    return registerUser;
  }

  /**
   * Given the user object this method when invoked will return the 
   * role registration query
   * @param {*} user 
   * @returns 
   */
  createRoleRegistrationQuery(user) {
    const role = (user.role === undefined || user.role === null) ? 'User' : user.role;
    const roleRegistration = `
      INSERT INTO UserRoles (user_id, role_id)
      VALUE (
        (
          SELECT id
          FROM User
          WHERE email = '${user.email}'
        ),
        (
          SELECT id
          FROM Roles
          WHERE role_name = '${role}'
        )
      );
    `;
    return roleRegistration;
  }

  /**
   * Given the user object this method when invoked will return the
   * fetch user role query
   * @param {*} user 
   * @returns 
   */
  createFetchUserRoleQuery(user) {
    const fetchUserRole = `
    SELECT r.role_name
    FROM UserRoles AS ur
    INNER JOIN Roles AS r
    ON ur.role_id = r.id
    WHERE ur.user_id = ${user.id}
    ;
    `;
    return fetchUserRole;
  }

  /**
   * Given the user object this method when invoked will return the 
   * user login query
   * @param {*} user 
   * @returns 
   */
  createLoginQuery(user) {
    const validateUser = `
    SELECT id, password_hashed
    FROM User
    WHERE email = '${user.email}'
    ;
    `;
    return validateUser;
  }

  /**
   * Given the user object this method when invoked will return the
   * user update query
   * @param {*} user 
   * @returns 
   */
  createUserUpdateQuery(user, password) {
    const start = "UPDATE User SET ";
    const end = ` WHERE id = ${user.id};`;
    let userUpdateQuery = start;

    if (password) {
      userUpdateQuery += "password_hashed = '" + password + "'";
    } else {

      if (user.id === undefined) {

        if (DEBUG) {
          console.log("Id Not Found!");
        }
        throw new Error("User Not Found!");
      }
      let index = 0;

      const nonUpdateKeys = new Array('role', 'DBClass', 'id');
      for (const key in user) {

        if (user[key] !== undefined && (!nonUpdateKeys.includes(key))) {
          if (user[key] === null) {
            userUpdateQuery = userUpdateQuery + ((index > 0) ? ', ' : '') + key + " = " + user[key];
          } else {
            userUpdateQuery = userUpdateQuery + ((index > 0) ? ', ' : '') + key + " = '" + user[key] + "'";
          }
          index++;
        }
      }

      if (index === 0) {
        throw new Error("Nothing to update!");
      }
    }
    userUpdateQuery += end;
    return userUpdateQuery;
  }

  /**
   * Given the user object this method when invoked will return the
   * role update query
   * @param {*} user 
   * @returns 
   */
  createRoleUpdateQuery(user) {
    const roleUpdate = `
    UPDATE UserRoles
    SET role_id = (
      SELECT id
      FROM Roles
      WHERE role_name = '${user.role}'
    )
    WHERE user_id = ${user.id}
    ;
    `;
    return roleUpdate;
  }

  /**
   * Given the user object this method when invoked will return the
   * delete user query
   * @param {*} user 
   * @returns 
   */
  createDeleteUserQuery(user) {
    const deleteUser = `
    DELETE
    FROM User
    WHERE id = ${user.id}
    ;
    `;
    return deleteUser;
  }

  /**
   * Given the user object this method when invoked will return the
   * user system registration query
   * @param {*} user 
   * @returns 
   */
  static createUserSystemRegistrationQuery(email, adminId) {
    const userSystemRegistration = `
    INSERT INTO UserSystem (user_id, system_id)
    VALUE (
      (
        SELECT id
        FROM user
        WHERE id = ${adminId}
      ),
      (
        SELECT id
        FROM user
        WHERE email = '${email}'
      )
    );
    `;
    return userSystemRegistration;
  }

  /**
   * Given the user object this method when invoked will return the
   * query to fetch user by id
   * @param {*} user 
   * @returns 
   */
  static createFetchUserByIdQuery(userId) {
    const fetchUserById = `
    SELECT u.first_name, u.middle_name, u.last_name, u.date_of_birth, g.gender, u.email, u.mobile, r.role_name
    FROM User AS u
    INNER JOIN UserRoles AS ur
    on u.id = ur.user_id
    INNER JOIN Roles AS r
    ON ur.role_id = r.id
    INNER JOIN Gender as g
    ON g.id = u.gender
    WHERE u.id = ${userId}
    ;
    `;
    return fetchUserById;
  }

  /**
   * Given the user object this method when invoked will return the
   * query to fetch user by email
   * @param {*} user 
   * @returns 
   */
  static createFetchUserByEmailQuery(email) {
    const fetchUserByEmail = `
    SELECT u.id, u.first_name, u.middle_name, u.last_name, u.date_of_birth, u.gender, u.mobile, r.role_name
    FROM User AS u
    INNER JOIN UserRoles AS ur
    on u.id = ur.user_id
    INNER JOIN Roles AS r
    ON ur.role_id = r.id
    WHERE u.email = '${email}'
    ;
    `;
    return fetchUserByEmail;
  }

  /**
   * Given the user object this method when invoked will return the
   * query to fetch user attribute by email
   * @param {*} user 
   * @returns 
   */
  static createFetchUserAttributeByEmailQuery(email, attribute = 'id') {
    const fetchUserAttributeByEmail = `
    SELECT ${attribute}
    FROM User
    WHERE email = '${email}'
    ;
    `;
    return fetchUserAttributeByEmail;
  }

  /**
   * Given the id or the token with the flag set this function returns
   * the query to fetch the token if any exists for that id or token
   * @param {*} target 
   * @param {*} isToken 
   * @returns 
   */
  static ifTokenExistsQuery(target, isToken = false) {
    let query;

    if (isToken) {
      query = `
        SELECT reset_token 
        FROM PasswordResetRequest
        WHERE reset_token = '${target}'
        AND is_valid = 1
        ;
      `;
    } else {
      query = `
      SELECT reset_token
      FROM PasswordResetRequest
      WHERE user_id = ${target}
      AND is_valid = 1
      ;
      `;
    }
    return query;
  }

  /**
   * Given the userId and the token this function will return the query
   * to save the token against that particular user
   * @param {*} target 
   * @param {*} token 
   * @returns 
   */
  static saveRandomTokenQuery(userId, token) {
    const saveToken = `
    INSERT INTO PasswordResetRequest (user_id, reset_token, reset_token_creation, is_valid)
    VALUE (
    (
      SELECT id
      FROM User
      WHERE id = ${userId}
    ),
    '${token}',
    NOW(),
    1
    );
    `;

    return saveToken;
  }

  /**
   * Given the userId or the token with the flag marked this function
   * will return a query that will invalidate the token
   * @param {*} target 
   * @param {*} isToken 
   * @returns 
   */
  static invalidateResetTokenQuery(target, isToken = false) {
    var invalidateToken = `
    UPDATE PasswordResetRequest
    SET is_valid = 0
    `;

    if (isToken) {
      invalidateToken += `
        WHERE reset_token = '${target}';
      `;
    } else {
      invalidateToken += `
        WHERE user_id = ${target};
      `;
    }

    return invalidateToken;
  }
}

module.exports = DBClass;
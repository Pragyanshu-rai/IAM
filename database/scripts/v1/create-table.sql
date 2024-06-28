-- using the correct db
USE IAM;

-- creating the gender table
CREATE TABLE IF NOT EXISTS Gender (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  gender VARCHAR(50) NOT NULL UNIQUE
);

-- creating the user table
CREATE TABLE IF NOT EXISTS User (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  middle_name VARCHAR(50) DEFAULT "",
  last_name VARCHAR(50) NOT NULL,
  date_of_birth DATE,
  gender INT UNSIGNED NOT NULL DEFAULT 0,
  email VARCHAR(80) NOT NULL UNIQUE,
  mobile VARCHAR(15) NOT NULL UNIQUE,
  password_hashed VARCHAR(300) NOT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT 0,
  FOREIGN KEY (gender) REFERENCES Gender (id)
);

-- creating the roles table
CREATE TABLE IF NOT EXISTS Roles (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  role_name VARCHAR(50) NOT NULL UNIQUE
);

-- creating the user_roles table
CREATE TABLE IF NOT EXISTS UserRoles (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES Roles (id)
);

-- creating the password_reset_request table
CREATE TABLE IF NOT EXISTS PasswordResetRequest (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  reset_token VARCHAR(32770) NOT NULL,
  reset_token_expiration DATETIME NOT NULL,
  isValid BOOLEAN DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE
);
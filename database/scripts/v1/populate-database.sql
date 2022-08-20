-- using the correct schema
USE IAM;

-- populating the gender table
INSERT INTO
  Gender (gender)
VALUES
  ('Transsexual Person'),
  ('FTM'),
  ('Male'),
  ('Female'),
  ('System'),
  ('Cis Man'),
  ('Agender'),
  ('Neutrois'),
  ('Intersex'),
  ('Bigender'),
  ('Cisgender'),
  ('Androgyne'),
  ('Trans Male'),
  ('Non-binary'),
  ('Cis Female'),
  ('Transsexual'),
  ('Trans Person'),
  ('Transmasculine'),
  ('Male to Female'),
  ('Gender Variant'),
  ('Transsexual Male'),
  ('Transgender Male'),
  ('Cisgender Female'),
  ('Transsexual Woman'),
  ('Gender Questioning'),
  ('Transsexual Female');

-- populating the user table
INSERT INTO
  User (
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    gender,
    email,
    mobile,
    password_hashed
  )
VALUES
  (
    'Maitilde',
    NULL,
    'Deane',
    '2018-05-30',
    (
      SELECT
        id
      FROM
        Gender
      WHERE
        Gender.gender = 'Gender Variant'
    ),
    'mdeane0@pcworld.com',
    '+74882899537',
    '3RR8F5o'
  ),
  (
    'Alberto',
    'Néhémie',
    'Petken',
    '2018-10-26',
    (
      SELECT
        id
      FROM
        Gender
      WHERE
        Gender.gender = 'FTM'
    ),
    'apetken2@harvard.edu',
    '+987351475197',
    'Xv05r9'
  );

-- populating the roles table
INSERT INTO
  Roles (role_name)
VALUES
  ('Admin'),
  ('Staff'),
  ('System'),
  ('User');

-- populating the user roles table
INSERT INTO
  UserRoles (user_id, role_id)
VALUES
  (
    (
      SELECT
        id
      FROM
        User
      WHERE
        email = 'mdeane0@pcworld.com'
    ),
    (
      SELECT
        id
      FROM
        Roles
      WHERE
        role_name = 'Admin'
    )
  ),
  (
    (
      SELECT
        id
      FROM
        User
      WHERE
        email = 'apetken2@harvard.edu'
    ),
    (
      SELECT
        id
      FROM
        Roles
      WHERE
        role_name = 'Staff'
    )
  );
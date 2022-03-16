const { check } = require("express-validator");
const usersRepo = require("../../repositories/users");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email.")
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error("Email in use.");
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
  requirePasswordConfirm: check("passwordConfirm")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters")
    .custom((passwordConfirm, { req }) => {
      if (passwordConfirm !== req.body.password) {
        throw new Error("Passwords must match");
      } else {
        return true;
      }
    }),
  requireEmailExist: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valide email")
    .custom(async (email) => {
      const user = await usersRepo.getOneBy({ email });
      if (!user) {
        throw new Error(`There is no user with this email!`);
      }
    }),
  requireValidePasswordForUser: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email });

      if (!user) {
        throw new Error(`Incorrect password!`);
      }
      const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
      );

      if (!validPassword) {
        throw new Error(`Incorrect password!`);
      }
    }),
  //product name validator
  requireTitle: check("title")
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage("Must be between 5 and 30 characters"),
  //product price validator
  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage("Must be a number, grater then 1"),
};

const { check } = require("express-validator");

const registerWorker = [
  // name
  check("name", "Name required").not().isEmpty(),
  check("name", "Name only can contains alphabet").isAlpha("en-US", {
    ignore: " ",
  }),
  // email
  check("email", "Email required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  // phone
  check("phone", "Phone required").not().isEmpty(),
  check("phone", "Phone only can contains number").isNumeric(),
  check("phone", "Phone maximum length is 12 characters").isLength({ max: 12 }),
  //role
  check("role", "Please Fill Your Role").not().isEmpty(),
  // password
  check("password", "Password require 8 or more characters").isLength({
    min: 8,
  }),
];

const registerRecruiter = [
  ...registerWorker,
  // companyName
  check("companyName", "Company Name required").not().isEmpty(),
  check(
    "companyName",
    "Company Name maximum length is 100 characters"
  ).isLength({ max: 100 }),
  // position
  check("position", "Position required").not().isEmpty(),
  check("position", "Position maximum length is 100 characters").isLength({
    max: 100,
  }),
];

const login = [
  // email
  check("email", "Email required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  // password
  check("password", "Password required").not().isEmpty(),
];

const forgot = [
  // email
  check("email", "Email required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
];

const reset = [
  // password
  check("password", "Password require 8 or more characters").isLength({
    min: 8,
  }),
];

module.exports = {
  registerWorker,
  registerRecruiter,
  login,
  forgot,
  reset,
};

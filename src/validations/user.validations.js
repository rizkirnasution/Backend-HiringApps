const { check } = require("express-validator");

const updateProfile = [
  // name
  check("name", "Name required").not().isEmpty(),
  check("name", "Name only can contains alphabet").isAlpha("en-US", {
    ignore: " ",
  }),
  check("name", "Name maximum length is 100 characters").isLength({ max: 100 }),
  // address
  check("address", "Adress maximum length is 100 characters").isLength({
    max: 100,
  }),
  // description
  check("description", "Description maximum length is 250 characters").isLength(
    { max: 250 }
  ),
  // phone
  check("phone", "Phone only can contains number").isNumeric(),
  check("phone", "Phone maximum length is 13 characters").isLength({ max: 13 }),
  // jobDesk
  check("jobDesc", "Job description maximum length is 50 characters").isLength({
    max: 50,
  }),
  // jobType
  check("jobType", "Job type maximum length is 50 characters").isLength({
    max: 50,
  }),
  // companyName
  check("companyName", "Work place maximum length is 100 characters").isLength({
    max: 100,
  }),
];

module.exports = {
  updateProfile,
};

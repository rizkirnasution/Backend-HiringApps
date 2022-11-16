const express = require("express");
const validation = require("../validations/auth.validations");
const runValidation = require("../middleware/runValidation");
const {
  register,
  activation,
  login,
  forgot,
  reset,
} = require("../controller/auth.controller");

const router = express.Router();

router
  .post("/auth/register", validation.registerWorker, runValidation, register)
  .post("/auth/login", validation.login, runValidation, login);

module.exports = router;

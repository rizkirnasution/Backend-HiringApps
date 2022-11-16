const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const { expOwner } = require("../middleware/authorization");
const { remove } = require("../controller/experience.controller");

const router = express.Router();

router.delete("/experience/:id", jwtAuth, expOwner, remove);

module.exports = router;

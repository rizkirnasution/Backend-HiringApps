const express = require("express");
const validation = require("../validations/user.validations");
const {
  myself,
  onlyRecruiter,
  onlyWorker,
} = require("../middleware/authorization");
const socialValidation = require("../validations/social.validations");
const runValidation = require("../middleware/runValidation");
const jwtAuth = require("../middleware/jwtAuth");
const upload = require("../middleware/upload");
const uploadLimit = require("../middleware/uploadLimit");
const {
  list,
  detail,
  updatePhoto,
  updateProfile,
  listNewWorker,
} = require("../controller/user.controller");

const router = express.Router();

router
  .get("/user/worker", list)
  .get("/user/recruiter", jwtAuth, list)
  .get("/user/:id", jwtAuth, detail)
  .put(
    "/user/:id/profile",
    jwtAuth,
    myself,
    validation.updateProfile,
    runValidation,
    socialValidation,
    updateProfile
  )
  .put("/user/:id/photo", jwtAuth, myself, upload, uploadLimit, updatePhoto)
  .get("/user/worker/new", listNewWorker);

module.exports = router;

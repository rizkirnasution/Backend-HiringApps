const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const { projectOwner } = require("../middleware/authorization");
const upload = require("../middleware/upload");
const uploadLimit = require("../middleware/uploadLimit");
const {
  remove,
  updatePhotoProject,
} = require("../controller/project.controller");

const router = express.Router();

router.delete("/project/:id", jwtAuth, projectOwner, remove);
router.put(
  "/project/:id/photo",
  jwtAuth,
  projectOwner,
  upload,
  uploadLimit,
  updatePhotoProject
);

module.exports = router;

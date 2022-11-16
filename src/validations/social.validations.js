const validUrl = require("valid-url");
const { failed } = require("../utils/createResponse");

module.exports = (req, res, next) => {
  try {
    const errors = [];

    if (req.body.instagram) {
      // jika instagram tidak valid
      if (!validUrl.isUri(req.body.instagram)) {
        errors.push({
          msg: "Instagram url is not valid",
          param: "instagram",
          location: "body",
        });
      }
    }

    if (req.body.linkedin) {
      // jika linkedin tidak valid
      if (!validUrl.isUri(req.body.linkedin)) {
        errors.push({
          msg: "Linkedin url is not valid",
          param: "linkedin",
          location: "body",
        });
      }
    }

    if (req.body.github) {
      // jika github tidak valid
      if (!validUrl.isUri(req.body.github)) {
        errors.push({
          msg: "Github url is not valid",
          param: "github",
          location: "body",
        });
      }
    }

    // jika validasi gagal
    if (errors.length) {
      failed(res, {
        code: 400,
        payload: errors,
        message: "Validation Failed",
      });
      return;
    }

    next();
  } catch (error) {
    failed(res, {
      code: 500,
      payload: error.message,
      message: "Internal Server Error",
    });
  }
};

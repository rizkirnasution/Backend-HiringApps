const jwt = require("jsonwebtoken");
const { failed } = require("../utils/createResponse");
const { SECRET_KEY_JWT } = require("../utils/env");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY_JWT);

    req.APP_DATA = { tokenDecoded: decoded };
    next();
  } catch (error) {
    failed(res, {
      code: 401,
      payload: "Token Invalid",
      message: "Unauthorized",
    });
  }
};

const jwt = require("jsonwebtoken");
const { SECRET_KEY_JWT } = require("./env");

module.exports = async (payload) => {
  const token = await jwt.sign(payload, SECRET_KEY_JWT, {
    expiresIn: 3600 * 6,
  });

  return token;
};

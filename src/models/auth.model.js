const { stubFalse } = require("lodash");
const db = require("../config/db");

module.exports = {
  register: (body) =>
    new Promise((resolve, reject) => {
      const {
        id,
        name,
        email,
        password,
        phone,
        address,
        role,
        is_verified = true,
        createdAt,
      } = body;

      db.query(
        "INSERT INTO users (id, name, email, password, phone, address, role, is_verified, created_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
        [
          id,
          name,
          email,
          password,
          phone,
          address,
          role,
          is_verified,
          createdAt,
        ],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updateToken: (id, token) =>
    new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET user_token=$1 WHERE id=$2",
        [token, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  resetPassword: (id, password) =>
    new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET password=$1 WHERE id=$2",
        [password, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
};

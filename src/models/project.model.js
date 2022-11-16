const db = require("../config/db");

module.exports = {
  findBy: (field, search) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM projects WHERE ${field}=$1`,
        [search],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  deleteAllProjectUserHave: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM projects WHERE user_id=$1",
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  addProject: (data) =>
    new Promise((resolve, reject) => {
      const { id, title, photo, app_type, repo, userId, createdAt } = data;

      db.query(
        "INSERT INTO projects (id, title, photo, app_type, repo, user_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [id, title, photo, app_type, repo, userId, createdAt],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  removeById: (id) =>
    new Promise((resolve, reject) => {
      db.query("DELETE FROM projects WHERE id=$1", [id], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
  changePhotoProject: (id, photo) =>
    new Promise((resolve, reject) => {
      db.query(
        "UPDATE projects SET photo=$1 WHERE id=$2",
        [photo, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
};

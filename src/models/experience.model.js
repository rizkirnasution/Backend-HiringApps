const db = require("../config/db");

module.exports = {
  findBy: (field, search) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM experiences WHERE ${field}=$1`,
        [search],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  deleteAllExperienceUserHave: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM experiences WHERE user_id=$1",
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  addExperience: (data) =>
    new Promise((resolve, reject) => {
      const {
        id,
        position,
        photo,
        company,
        start_date,
        end_date,
        description,
        userId,
        createdAt,
      } = data;

      db.query(
        "INSERT INTO experiences (id, position, photo, company, start_date, end_date, description, user_id, created_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          id,
          position,
          photo,
          company,
          start_date || null,
          end_date || null,
          description,
          userId,
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
  removeById: (id) =>
    new Promise((resolve, reject) => {
      db.query("DELETE FROM experiences WHERE id=$1", [id], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
};

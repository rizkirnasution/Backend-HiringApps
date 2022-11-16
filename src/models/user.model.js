const db = require("../config/db");

module.exports = {
  findBy: (field, search) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE ${field}=$1`,
        [search],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  selectAllWorker: (search = "", sortBy = "") =>
    new Promise((resolve, reject) => {
      let sql = `SELECT users.id, users.name, users.email, users.photo, users.address, users.phone, workers.job_desc, workers.skills FROM users INNER JOIN workers ON users.id = workers.users_id WHERE users.is_verified=true AND LOWER(users.name) LIKE '%'||LOWER($1)||'%' OR (
        0 < (
          SELECT COUNT(*) 
          FROM unnest(workers.skills) AS skills
          WHERE LOWER(skills) LIKE '%'||LOWER($1)||'%'
        )
      ) OR LOWER(workers.job_desc) LIKE '%'||LOWER($1)||'%' OR LOWER(users.address) LIKE '%'||LOWER($1)||'%'`;

      if (sortBy.trim() === "name") {
        sql += " ORDER BY users.name";
      } else {
        sql += " ORDER BY users.created_date";
      }

      db.query(sql, [search], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
  selectAllRecruiter: (search = "", sortBy = "") =>
    new Promise((resolve, reject) => {
      let sql = `SELECT users.id, users.name, users.email, users.photo, users.address, users.phone, recruiters.position, recruiters.company_name FROM users INNER JOIN recruiters ON users.id = recruiters.users_id WHERE users.is_verified=true AND LOWER(users.name) LIKE '%'||LOWER($1)||'%' OR LOWER(recruiters.position) LIKE '%'||LOWER($1)||'%' OR LOWER(recruiters.company_name) LIKE '%'||LOWER($1)||'%' OR LOWER(users.address) LIKE '%'||LOWER($1)||'%'`;

      if (sortBy.trim() === "name") {
        sql += " ORDER BY users.name";
      } else {
        sql += " ORDER BY users.created_date";
      }

      db.query(sql, [search], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
  selectDetailWorker: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        "SELECT users.id, users.name, users.description, users.role, users.email, users.photo, users.instagram, users.github, users.linkedin, users.address, users.phone, users.created_date, workers.company_name, workers.job_desc, workers.job_type, workers.skills FROM users INNER JOIN workers ON users.id = workers.users_id WHERE users.id=$1",
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  selectDetailRecruiter: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        "SELECT users.id, users.name, users.description, users.role, users.email, users.photo, users.instagram, users.github, users.linkedin, users.address, users.phone, users.created_date, recruiters.company_name, recruiters.position FROM users INNER JOIN recruiters ON users.id = recruiters.users_id WHERE users.id=$1",
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  changePhoto: (id, photo) =>
    new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET photo=$1 WHERE id=$2",
        [photo, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updateUserData: (id, data) =>
    new Promise((resolve, reject) => {
      const { name, address, description, phone, instagram, github, linkedin } =
        data;

      db.query(
        "UPDATE users SET name=$1, address=$2, description=$3, phone=$4, instagram=$5, github=$6, linkedin=$7 WHERE id=$8",
        [name, address, description, phone, instagram, github, linkedin, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  selectListNewWorker: () =>
    new Promise((resolve, reject) => {
      db.query(
        "SELECT users.id, users.name, users.email, users.description, users.photo, users.address, users.phone, workers.job_desc, workers.skills, users.created_date FROM users INNER JOIN workers ON users.id = workers.users_id WHERE users.is_verified=true ORDER BY users.created_date DESC LIMIT 10",
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
};

const db = require("../config/db");

module.exports = {
  addWorker: (data) =>
    new Promise((resolve, reject) => {
      const { id, userId } = data;

      db.query(
        "INSERT INTO workers (id, users_id) VALUES ($1, $2)",
        [id, userId],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updateWorkerData: (id, data) =>
    new Promise((resolve, reject) => {
      const { jobDesc, jobType, skills } = data;

      db.query(
        "UPDATE workers SET job_type=$1, job_desc=$2, skills=$3 WHERE users_id=$4",
        [jobType, jobDesc, skills, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updateRecruiterData: (id, data) =>
    new Promise((resolve, reject) => {
      const { position, companyName } = data;

      db.query(
        "UPDATE recruiters SET position=$1, company_name=$2 WHERE users_id=$3",
        [position, companyName, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
};

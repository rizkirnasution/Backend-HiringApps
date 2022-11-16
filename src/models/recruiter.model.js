const db = require("../config/db");

module.exports = {
  addRecruiter: (data) =>
    new Promise((resolve, reject) => {
      const { id, userId } = data;

      db.query(
        "INSERT INTO recruiters (id, users_id) VALUES ($1, $2)",
        [id, userId],
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
      const { companyName, position } = data;

      db.query(
        "UPDATE recruiters SET company_name=$1, position=$2 WHERE user_id=$4",
        [companyName, position, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
};

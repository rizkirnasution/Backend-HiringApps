const experienceModel = require("../models/experience.model");
const { success, failed } = require("../utils/createResponse");

module.exports = {
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const experience = await experienceModel.findBy("id", id);

      // jika experience tidak ditemukan
      if (!experience.rowCount) {
        failed(res, {
          code: 404,
          payload: `Experience with Id ${id} not found`,
          message: "Delete Experience Failed",
        });
        return;
      }
      await experienceModel.removeById(id);

      success(res, {
        code: 200,
        payload: null,
        message: "Delete Experience Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
};

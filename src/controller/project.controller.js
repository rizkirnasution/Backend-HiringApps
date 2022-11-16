const projectModel = require("../models/project.model");
const { success, failed } = require("../utils/createResponse");

module.exports = {
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const project = await projectModel.findBy("id", id);

      // jika project tidak ditemukan
      if (!project.rowCount) {
        failed(res, {
          code: 404,
          payload: `Project with Id ${id} not found`,
          message: "Delete Project Failed",
        });
        return;
      }
      await projectModel.removeById(id);

      success(res, {
        code: 200,
        payload: null,
        message: "Delete Project Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  updatePhotoProject: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userModel.findBy("id", id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        // hapus jika ada upload photo
        if (req.files) {
          if (req.files.photo) {
            deleteFile(req.files.photo[0].path);
          }
        }

        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: "Update User Photo Failed",
        });
        return;
      }
      // jika ada upload photo
      const PORT = process.env.PORT || 5000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      let photo = req.files.photo[0].filename;
      if (req.files) {
        if (req.files.photo) {
          await projectModel.changePhotoProject(
            user.rows[0].id,
            (photo = `http://${DB_HOST}:${PORT}/img/${photo}`)
          );
        }
      }

      success(res, {
        code: 200,
        payload: null,
        message: "Update Project Photo Success",
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

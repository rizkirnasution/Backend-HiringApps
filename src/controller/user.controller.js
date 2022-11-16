const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/user.model");
const workerModel = require("../models/worker.model");
const projectModel = require("../models/project.model");
const experienceModel = require("../models/experience.model");
const deleteFile = require("../utils/deleteFile");
const { success, failed } = require("../utils/createResponse");

module.exports = {
  list: async (req, res) => {
    try {
      const { search, orderBy } = req.query;

      if (
        req.originalUrl
          .split("/")
          [req.originalUrl.split("/").length - 1].slice(0, 9) === "recruiter"
      ) {
        const users = await userModel.selectAllRecruiter(search, orderBy);

        success(res, {
          code: 200,
          payload: users.rows,
          message: "Select List Recruiter Success",
        });
      } else {
        const users = await userModel.selectAllWorker(search, orderBy);

        success(res, {
          code: 200,
          payload: users.rows,
          message: "Select List Worker Success",
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findBy("id", id);

      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: "Select Detail User Failed",
        });
        return;
      }

      let userDetail = null;
      // menentukan yang akan diambil data worker atau recruiter
      if (user.rows[0].role === "worker") {
        const userData = await userModel.selectDetailWorker(user.rows[0].id);
        const projectsData = await projectModel.findBy(
          "user_id",
          user.rows[0].id
        );
        const experiencesData = await experienceModel.findBy(
          "user_id",
          user.rows[0].id
        );

        userDetail = {
          ...userData.rows[0],
          projects: projectsData.rows,
          experiences: experiencesData.rows,
        };
      } else {
        const recruiterDetail = await userModel.selectDetailRecruiter(
          user.rows[0].id
        );
        userDetail = recruiterDetail.rows[0];
      }

      success(res, {
        code: 200,
        payload: userDetail,
        message: "Select Detail User Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  updatePhoto: async (req, res) => {
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
          await userModel.changePhoto(
            user.rows[0].id,
            (photo = `http://${DB_HOST}:${PORT}/img/${photo}`)
          );
        }
      }

      success(res, {
        code: 200,
        payload: null,
        message: "Update User Photo Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userModel.findBy("id", id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: "Update User Profile Failed",
        });
        return;
      }

      // update user data
      const { name, address, description, phone, instagram, github, linkedin } =
        req.body;

      await userModel.updateUserData(user.rows[0].id, {
        name,
        address,
        description,
        phone,
        instagram,
        github,
        linkedin,
      });

      if (user.rows[0].role === "worker") {
        // update worker data
        const { jobDesc, jobType, skills } = req.body;
        await workerModel.updateWorkerData(user.rows[0].id, {
          jobDesc,
          jobType,
          skills,
        });

        // add / update project data
        const { projects } = req.body;
        if (projects) {
          await projectModel.deleteAllProjectUserHave(user.rows[0].id);

          projects.map(async (project) => {
            await projectModel.addProject({
              id: uuidv4(),
              ...project,
              createdAt: new Date(),
              userId: user.rows[0].id,
            });
          });
        }

        // add / update experience data
        const { experiences } = req.body;
        if (experiences) {
          await experienceModel.deleteAllExperienceUserHave(user.rows[0].id);

          experiences.map(async (project) => {
            await experienceModel.addExperience({
              id: uuidv4(),
              ...project,
              createdAt: new Date(),
              userId: user.rows[0].id,
            });
          });
        }
      } else {
        // update worker data
        const { position, companyName } = req.body;
        await workerModel.updateRecruiterData(user.rows[0].id, {
          position,
          companyName,
        });
      }

      success(res, {
        code: 200,
        payload: null,
        message: "Update User Profile Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  listNewWorker: async (req, res) => {
    try {
      const workers = await userModel.selectListNewWorker();

      success(res, {
        code: 200,
        payload: workers.rows,
        message: "Select List New Worker Success",
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

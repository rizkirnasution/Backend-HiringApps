const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const authModel = require("../models/auth.model");
const userModel = require("../models/user.model");
const workerModel = require("../models/worker.model");
const recruiterModel = require("../models/recruiter.model");
const jwtToken = require("../utils/generateToken");
const { success, failed } = require("../utils/createResponse");

module.exports = {
  register: async (req, res) => {
    try {
      const user = await userModel.findBy("email", req.body.email);
      if (user.rowCount) {
        failed(res, {
          code: 409,
          payload: "Email already exist",
          message: "Register Failed",
        });
        return;
      }

      const { name, email, phone, address, role, is_verified } = req.body;
      const password = await bcrypt.hash(req.body.password, 10);
      const token = crypto.randomBytes(30).toString("hex");

      const insertData = await authModel.register({
        id: uuidv4(),
        name,
        email,
        phone,
        address,
        password,
        role,
        is_verified,
        createdAt: new Date(),
      });

      if (role === "recruiter") {
        await recruiterModel.addRecruiter({
          id: uuidv4(),
          userId: insertData.rows[0].id,
        });
      } else {
        await workerModel.addWorker({
          id: uuidv4(),
          userId: insertData.rows[0].id,
        });
      }
      await authModel.updateToken(insertData.rows[0].id, token);

      success(res, {
        code: 201,
        payload: null,
        message: "Register Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findBy("email", email);

      // jika user ditemukan
      if (user.rowCount > 0) {
        const match = await bcrypt.compare(password, user.rows[0].password);
        // jika password benar
        if (match) {
          const jwt = await jwtToken({
            id: user.rows[0].id,
            role: user.rows[0].role,
          });
          success(res, {
            code: 200,
            payload: null,
            message: "Login Success",
            token: {
              jwt,
              id: user.rows[0].id,
              role: user.rows[0].role,
            },
          });
          return;
        }
      }

      failed(res, {
        code: 401,
        payload: "Wrong Email or Password",
        message: "Login Failed",
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

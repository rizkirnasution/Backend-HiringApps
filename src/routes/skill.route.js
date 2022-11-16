const express = require("express");
const { success, failed } = require("../utils/createResponse");

const router = express.Router();

router.get("/skill/static", async (req, res) => {
  try {
    const skills = [
      {
        skillName: "Java",
      },
      {
        skillName: "PHP",
      },
      {
        skillName: "Python",
      },
      {
        skillName: "Javascript",
      },
      {
        skillName: "Golang",
      },
      {
        skillName: "Ruby",
      },
      {
        skillName: "NextJS",
      },
      {
        skillName: "NodeJS",
      },
      {
        skillName: "SQL",
      },
      {
        skillName: "PostgreSQL",
      },
      {
        skillName: "C++",
      },
      {
        skillName: "C#",
      },
    ];

    success(res, {
      code: 200,
      payload: skills,
      message: "Register Success",
    });
  } catch (error) {
    failed(res, {
      code: 500,
      payload: error.message,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;

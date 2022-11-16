require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const createError = require("http-errors");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(xss());
app.use("/img", express.static("./public/photo"));

app.use(require("./src/routes/auth.route"));
app.use(require("./src/routes/user.route"));
app.use(require("./src/routes/skill.route"));
app.use(require("./src/routes/experience.route"));
app.use(require("./src/routes/project.route"));

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});
// app.use((err, req, res, next) => {
//   const messageError = err.message || "internal server error";
//   const statusCode = err.status || 500;

//   res.status(statusCode).json({
//     message: messageError,
//   });
//   next();
// });

app.use((err, req, res, next) => {
  const statusCode = err.status;
  if (res.status(statusCode)) {
    res.json(createError(statusCode, err));
  }
  next();
});

const host = process.env.DB_HOST;
const port = process.env.PORT;
app.listen(8080, () => {
  console.log(`server running on http://${host}:${port}`);
});

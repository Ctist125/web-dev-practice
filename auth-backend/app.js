// 내부 라이브러리 선언
const path = require("path");

// 외부 라이브러리 선언
const express = require("express");
const dotenv = require("dotenv");
const expressSession = require("express-session");

// 프로젝트 내 파일 선언
const db = require("./data/database");
const createSessionConfig = require("./config/session");
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authRoutes = require("./routes/auth.routes");
const licenseRoutes = require("./routes/license.routes");

// express
const app = express();

// dotenv
dotenv.config();

// session config
const sessionConfig = createSessionConfig();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares & routes
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(expressSession(sessionConfig));

app.use(authRoutes);
app.use(licenseRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// port open
db.connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

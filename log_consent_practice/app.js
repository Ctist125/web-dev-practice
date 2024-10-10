// 내부 라이브러리 선언
const path = require("path");
const fs = require("fs");

// 외부 라이브러리 선언
const express = require("express");
const expressSession = require("express-session");
const morgan = require("morgan");

// 프로젝트 내 파일
const db = require("./data/database");
const createSessionConfig = require("./config/session");
const logConsentMiddleware = require("./middlewares/log_consent");
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const logRoutes = require("./routes/log.routes");
const basicRoutes = require("./routes/basic.routes");
const logForm = require("./util/log-form");

// express.js
const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// setting
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// session setting
const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));

// 로그 수집 동의 확인 라우트 & 미들웨어
app.use(logRoutes);
app.use(logConsentMiddleware);

// morgan
const logDirectory = path.join(__dirname, "logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = fs.createWriteStream(path.join(logDirectory, "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));

// 미들웨어 & 라우트
app.use(basicRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    const date = new Date();

    console.log(logForm(date.toISOString(), "SERVER", "Database 연결에 실패하였습니다."));
    console.log(error);
  });

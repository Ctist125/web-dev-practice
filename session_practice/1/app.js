// 내장 라이브러리
const path = require("path");

// 외장 라이브러리
const express = require("express");
const expressSession = require("express-session");

// 프로젝트 내부 파일
const createSessionConfig = require("./config/session");
const db = require("./data/database");
const checkAuthStatusMiddleware = require('./middlewares/auth-check');
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authRoutes = require("./routes/auth.routes");
const licenseRoutes = require("./routes/license.routes");

// express.js
const app = express();

// view engine 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 설정
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// 세션
const sessionConfig = createSessionConfig();

// 미들웨어 & 라우트
app.use(expressSession(sessionConfig));

app.use(checkAuthStatusMiddleware);

app.use(authRoutes);
app.use(licenseRoutes);

app.use(errorHandlerMiddleware.notFound);
app.use(errorHandlerMiddleware.errorHandler);

db.connectToDatbase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("데이터 베이스 연결 실패");
    console.log(error);
  });

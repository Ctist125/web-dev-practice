// 내부 라이브러리
const path = require("path");

// 외부 라이브러리
const express = require("express");
const cookieParser = require("cookie-parser");

// 프로젝트 내부 파일
const db = require("./data/database");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRoutes = require("./routes/auth.routes");
const licenseRoute = require("./routes/license.routes");

// express.js
const app = express();

// ejs 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 기본 설정
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// 미들웨어 & 라우트
app.use(authRoutes);
app.use(licenseRoute);

app.use(errorHandlerMiddleware.notFound);
app.use(errorHandlerMiddleware.errorHandler);

db.connectToatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("database연결에 실패했습니다.");
    console.log(error);
  });

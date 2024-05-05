// 내장 라이브러리
const path = require("path");

// 외장 라이브러리
const express = require("express");

// 프로젝트 내부 파일
const db = require("./data/database");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const mainRoutes = require("./routes/main.routes");
const authRoutes = require("./routes/auth.routes");

// express js
const app = express();

// ejs 파일 위치 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(mainRoutes);
app.use(authRoutes);

app.use(errorHandlerMiddleware.notFoundHandler);
app.use(errorHandlerMiddleware.handleErrors);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Database 연결 실패");
    console.log("error");
  });

// 내부 라이브러리 선언
const path = require("path");

// 외부 라이브러리 선언
const express = require("express");

// 프로젝트 내 파일
const db = require("./data/database");
const basicRoutes = require("./routes/basic.routes");

// express
const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// setting
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// 미들웨어 & 라우트
app.use(basicRoutes);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Database연결에 실패했습니다.");
    console.log(error);
  });

// 내부 라이브러리
const path = require("path");

// 외부 라이브러리
const express = require("express");

// 프로젝트 내부 파일
const basicRoutes = require("./routes/basic.routes");

// express.js
const app = express();

// view engine 설정
app.set("view engine", "ejs");
app.set("viewss", path.join(__dirname, "views"));

// express 설정
app.use(express.static("public"));

// 미들웨어 & 라우트
app.use(basicRoutes);

app.listen(3000);
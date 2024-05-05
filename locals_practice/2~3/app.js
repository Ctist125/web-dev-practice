// 내부 라이브러리
const path = require("path");

// 외부 라이브러리
const express = require("express");

// 프로젝트 내부 파일
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authRoutes = require("./routes/auth.routes");
const { error } = require("console");

// express.js
const app = express();

// ejs 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// public 설정
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// 미들웨어 & 라우트
app.use(authRoutes);

app.use(errorHandlerMiddleware.notFound);

app.use(errorHandlerMiddleware.errorHandler);

app.listen(3000);

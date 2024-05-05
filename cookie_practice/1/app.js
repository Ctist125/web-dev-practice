// 내부 라이브러리
const path = require("path");

// 외부 라이브러리
const express = require("express");
const cookieParser = require("cookie-parser");

// 프로젝트 내부 파일
const mainRoutes = require("./routes/main.routes");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { error } = require("console");

// express.js
const app = express();

// ejs 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 설정
app.use(cookieParser());
app.use(express.static("public"));

// 미들웨어 & 라우트
app.use(mainRoutes);

app.use(errorHandlerMiddleware.notFound);

app.use(errorHandlerMiddleware.errorHandler);

app.listen(3000);
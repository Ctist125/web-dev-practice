// 내부 라이브러리
const path = require("path");

// 외부 라이브러리
const express = require("express");

// 프로젝트 내부 파일
const visitorCountMiddleware = require("./middlewares/visitorCount.middleware");
const errorHandlerMiddlware = require("./middlewares/error-handler");
const mainRoutes = require("./routes/main.routes");
const { error } = require("console");

// express.js
const app = express();

// ejs 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// css, js 설정
app.use(express.static("public"));

// 미들웨어 & 라우트
app.use(visitorCountMiddleware);

app.use(mainRoutes);

app.use(errorHandlerMiddlware.notFount);

app.use(errorHandlerMiddlware.errorHandler);

app.listen(3000);
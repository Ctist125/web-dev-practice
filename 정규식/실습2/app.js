// 내부 라이브러리 선언
const path = require("path");

// 외부 라이브러리 선언
const express = require("express");
const expressSession = require("express-session");

// 프로젝트 내 파일
const db = require("./data/database");
const createSessionConfig = require("./config/session");
const authMiddleware = require("./middlewares/auth-check");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authRoutes = require("./routes/auth.routes");
const licesneRoutes = require("./routes/license.routes");

// express
const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// setting
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

// 미들웨어 & 라우터
app.use(expressSession(sessionConfig));

app.use(authMiddleware);

app.use(authRoutes);
app.use(licesneRoutes);

app.use(errorHandlerMiddleware.pageNotFound);
app.use(errorHandlerMiddleware.errorHandler);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Database 연결에 실패했습니다.");
    console.log(error);
  });

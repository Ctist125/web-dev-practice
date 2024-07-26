// 내부 라이브러리 선언
const path = require("path");

// 외부 라이브러리 선언
const express = require("express");
const expressSession = require("express-session");

// 프로젝트 내 파일
const createSessionConfig = require("./config/session");
const db = require("./data/database");
const authCheckMiddleware = require("./middlewares/auth-check");
const notFounMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const basicRoutes = require("./routes/basic.routes");
const authRouter = require("./routes/auth.routes");

// express
const app = express();

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// setting
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));

app.use(authCheckMiddleware);

app.use(basicRoutes);
app.use(authRouter);

app.use(notFounMiddleware);
app.use(errorHandlerMiddleware)

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("데이터베이스 연결에 실패했습니다.");
    console.log(error);
  });

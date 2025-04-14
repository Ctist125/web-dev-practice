// 외부 라이브러리 선언
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// 프로젝트 내 파일 선언
const db = require("./data/database");
const authRoutes = require("./routes/auth.routes");

// express
const app = express();

// dotenv
dotenv.config();

// middlewares & routes
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

// port open
db.connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((error) => {
    console.log(error);
  });

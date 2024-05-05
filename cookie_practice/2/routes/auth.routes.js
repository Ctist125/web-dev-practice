// 외부 라이브러리
const express = require("express");

// 프로젝트 내부 파일
const authController = require("../controller/auth.controller");

// express.js
const router = express.Router();

router.get("/", authController.getLogin);

router.post("/login", authController.login);

router.get("/signup", authController.getSignup);

router.post("/signup", authController.signup);

module.exports = router;
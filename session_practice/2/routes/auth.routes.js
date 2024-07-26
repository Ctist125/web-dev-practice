// 외부 라이브러리 선언
const express = require("express");

// 프로젝트 내 파일
const authController = require("../controller/auth.controller");

// express
const router = express.Router();

router.get("/sign-up", authController.getSignup);

router.post("/sign-up", authController.signup);

router.get("/sign-in", authController.getSignin);

router.post("/sign-in", authController.signin);

router.get("/log-out", authController.logout);

module.exports = router;
